#[test_only]
module permission_expiry_addr::permission_expiry_tests {
    use permission_expiry_addr::permission_expiry;
    use std::string;
    use aptos_framework::timestamp;

    #[test(admin = @0x123, grantee = @0x456, aptos_framework = @0x1)]
    public entry fun test_initialize_and_grant_permission(admin: signer, grantee: signer, aptos_framework: signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing(&aptos_framework);
        
        // Initialize the permission registry
        permission_expiry::initialize(&admin);
        
        let admin_addr = std::signer::address_of(&admin);
        let grantee_addr = std::signer::address_of(&grantee);
        
        // Test granting permission
        let permission_type = string::utf8(b"READ_ACCESS");
        let expiry_timestamp = timestamp::now_seconds() + 3600; // 1 hour from now
        let metadata = string::utf8(b"Test permission metadata");
        
        permission_expiry::grant_permission(
            &admin,
            grantee_addr,
            permission_type,
            expiry_timestamp,
            metadata
        );
        
        // Test permission validity
        assert!(
            permission_expiry::is_permission_valid(admin_addr, grantee_addr, permission_type),
            1
        );
        
        // Test getting permission details
        let (
            returned_grantee,
            returned_type,
            returned_expiry,
            returned_granted_by,
            _granted_at,
            returned_status,
            returned_metadata
        ) = permission_expiry::get_permission(admin_addr, grantee_addr, permission_type);
        
        assert!(returned_grantee == grantee_addr, 2);
        assert!(returned_type == permission_type, 3);
        assert!(returned_expiry == expiry_timestamp, 4);
        assert!(returned_granted_by == admin_addr, 5);
        assert!(returned_status == 1, 6); // PERMISSION_ACTIVE
        assert!(returned_metadata == metadata, 7);
    }

    #[test(admin = @0x123, grantee = @0x456, aptos_framework = @0x1)]
    public entry fun test_revoke_permission(admin: signer, grantee: signer, aptos_framework: signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing(&aptos_framework);
        
        // Initialize the permission registry
        permission_expiry::initialize(&admin);
        
        let admin_addr = std::signer::address_of(&admin);
        let grantee_addr = std::signer::address_of(&grantee);
        
        // Grant permission first
        let permission_type = string::utf8(b"WRITE_ACCESS");
        let expiry_timestamp = timestamp::now_seconds() + 3600;
        let metadata = string::utf8(b"Test permission");
        
        permission_expiry::grant_permission(
            &admin,
            grantee_addr,
            permission_type,
            expiry_timestamp,
            metadata
        );
        
        // Verify permission is valid
        assert!(
            permission_expiry::is_permission_valid(admin_addr, grantee_addr, permission_type),
            1
        );
        
        // Revoke permission
        permission_expiry::revoke_permission(&admin, grantee_addr, permission_type);
        
        // Verify permission is no longer valid
        assert!(
            !permission_expiry::is_permission_valid(admin_addr, grantee_addr, permission_type),
            2
        );
    }

    #[test(admin = @0x123, grantee = @0x456, aptos_framework = @0x1)]
    public entry fun test_permission_expiry(admin: signer, grantee: signer, aptos_framework: signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing(&aptos_framework);
        
        // Initialize the permission registry
        permission_expiry::initialize(&admin);
        
        let admin_addr = std::signer::address_of(&admin);
        let grantee_addr = std::signer::address_of(&grantee);
        
        // Grant permission with short expiry
        let permission_type = string::utf8(b"TEMP_ACCESS");
        let current_time = timestamp::now_seconds();
        let expiry_timestamp = current_time + 1; // 1 second from now
        let metadata = string::utf8(b"Temporary permission");
        
        permission_expiry::grant_permission(
            &admin,
            grantee_addr,
            permission_type,
            expiry_timestamp,
            metadata
        );
        
        // Permission should be valid initially
        assert!(
            permission_expiry::is_permission_valid(admin_addr, grantee_addr, permission_type),
            1
        );
        
        // Fast forward time to after expiry
        timestamp::fast_forward_seconds(2);
        
        // Permission should now be invalid due to expiry
        assert!(
            !permission_expiry::is_permission_valid(admin_addr, grantee_addr, permission_type),
            2
        );
    }

    #[test(admin = @0x123, aptos_framework = @0x1)]
    public entry fun test_admin_functions(admin: signer, aptos_framework: signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing(&aptos_framework);
        
        // Initialize the permission registry
        permission_expiry::initialize(&admin);
        
        let admin_addr = std::signer::address_of(&admin);
        
        // Test admin check
        assert!(permission_expiry::is_admin(admin_addr, admin_addr), 1);
        
        // Test get admin
        let returned_admin = permission_expiry::get_admin(admin_addr);
        assert!(returned_admin == admin_addr, 2);
    }
}
