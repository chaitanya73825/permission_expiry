module permission_expiry_addr::permission_expiry {
    use std::signer;
    use std::string::{Self, String};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_std::table::{Self, Table};

    /// Error codes
    const E_NOT_ADMIN: u64 = 1;
    const E_PERMISSION_NOT_FOUND: u64 = 2;
    const E_PERMISSION_EXPIRED: u64 = 3;
    const E_INVALID_EXPIRY_TIME: u64 = 4;
    const E_PERMISSION_ALREADY_EXISTS: u64 = 5;
    const E_NOT_PERMISSION_OWNER: u64 = 6;

    /// Permission status enum
    const PERMISSION_ACTIVE: u8 = 1;
    const PERMISSION_EXPIRED: u8 = 2;
    const PERMISSION_REVOKED: u8 = 3;

    /// Permission struct
    struct Permission has store, copy, drop {
        grantee: address,
        permission_type: String,
        expiry_timestamp: u64,
        granted_by: address,
        granted_at: u64,
        status: u8,
        metadata: String,
    }

    /// Global permission registry
    struct PermissionRegistry has key {
        permissions: Table<address, Permission>, // Simplified: one permission per address
        admin: address,
        next_id: u64,
    }

    #[event]
    struct PermissionGrantedEvent has drop, store {
        grantee: address,
        permission_type: String,
        expiry_timestamp: u64,
        granted_by: address,
        granted_at: u64,
    }

    #[event]
    struct PermissionRevokedEvent has drop, store {
        grantee: address,
        permission_type: String,
        revoked_by: address,
        revoked_at: u64,
    }

    #[event]
    struct PermissionExpiredEvent has drop, store {
        grantee: address,
        permission_type: String,
        expired_at: u64,
    }

    /// Initialize the permission registry
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        
        if (!exists<PermissionRegistry>(admin_addr)) {
            move_to(admin, PermissionRegistry {
                permissions: table::new(),
                admin: admin_addr,
                next_id: 0,
            });
        };
    }

    /// Grant a permission to an address
    public entry fun grant_permission(
        admin: &signer,
        grantee: address,
        permission_type: String,
        expiry_timestamp: u64,
        metadata: String,
    ) acquires PermissionRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<PermissionRegistry>(admin_addr), E_NOT_ADMIN);
        
        let registry = borrow_global_mut<PermissionRegistry>(admin_addr);
        assert!(registry.admin == admin_addr, E_NOT_ADMIN);
        
        let current_time = timestamp::now_seconds();
        assert!(expiry_timestamp > current_time, E_INVALID_EXPIRY_TIME);
        
        let permission = Permission {
            grantee,
            permission_type: permission_type,
            expiry_timestamp,
            granted_by: admin_addr,
            granted_at: current_time,
            status: PERMISSION_ACTIVE,
            metadata,
        };

        table::upsert(&mut registry.permissions, grantee, permission);

        // Emit event
        event::emit(PermissionGrantedEvent {
            grantee,
            permission_type: permission_type,
            expiry_timestamp,
            granted_by: admin_addr,
            granted_at: current_time,
        });
    }

    /// Revoke a permission
    public entry fun revoke_permission(
        admin: &signer,
        grantee: address,
    ) acquires PermissionRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<PermissionRegistry>(admin_addr), E_NOT_ADMIN);
        
        let registry = borrow_global_mut<PermissionRegistry>(admin_addr);
        assert!(registry.admin == admin_addr, E_NOT_ADMIN);
        assert!(table::contains(&registry.permissions, grantee), E_PERMISSION_NOT_FOUND);
        
        let permission = table::borrow_mut(&mut registry.permissions, grantee);
        let permission_type = permission.permission_type;
        permission.status = PERMISSION_REVOKED;
        
        let current_time = timestamp::now_seconds();

        // Emit event
        event::emit(PermissionRevokedEvent {
            grantee,
            permission_type: permission_type,
            revoked_by: admin_addr,
            revoked_at: current_time,
        });
    }

    /// Check if a permission is valid (active and not expired)
    #[view]
    public fun is_permission_valid(
        admin_addr: address,
        grantee: address,
    ): bool acquires PermissionRegistry {
        if (!exists<PermissionRegistry>(admin_addr)) {
            return false
        };
        
        let registry = borrow_global<PermissionRegistry>(admin_addr);
        
        if (!table::contains(&registry.permissions, grantee)) {
            return false
        };
        
        let permission = table::borrow(&registry.permissions, grantee);
        let current_time = timestamp::now_seconds();
        
        if (permission.status != PERMISSION_ACTIVE) {
            return false
        };
        
        if (permission.expiry_timestamp <= current_time) {
            return false
        };
        
        true
    }

    /// Get permission details
    #[view]
    public fun get_permission(
        admin_addr: address,
        grantee: address,
    ): (address, String, u64, address, u64, u8, String) acquires PermissionRegistry {
        assert!(exists<PermissionRegistry>(admin_addr), E_NOT_ADMIN);
        
        let registry = borrow_global<PermissionRegistry>(admin_addr);
        assert!(table::contains(&registry.permissions, grantee), E_PERMISSION_NOT_FOUND);
        
        let permission = table::borrow(&registry.permissions, grantee);
        
        (
            permission.grantee,
            permission.permission_type,
            permission.expiry_timestamp,
            permission.granted_by,
            permission.granted_at,
            permission.status,
            permission.metadata
        )
    }

    /// Check if address is admin
    #[view]
    public fun is_admin(account_addr: address, admin_addr: address): bool acquires PermissionRegistry {
        if (!exists<PermissionRegistry>(admin_addr)) {
            return false
        };
        
        let registry = borrow_global<PermissionRegistry>(admin_addr);
        registry.admin == account_addr
    }

    /// Get admin address
    #[view]
    public fun get_admin(admin_addr: address): address acquires PermissionRegistry {
        assert!(exists<PermissionRegistry>(admin_addr), E_NOT_ADMIN);
        let registry = borrow_global<PermissionRegistry>(admin_addr);
        registry.admin
    }

    /// Check if registry exists
    #[view]
    public fun registry_exists(admin_addr: address): bool {
        exists<PermissionRegistry>(admin_addr)
    }
}
