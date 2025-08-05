#[test_only]
module permission_expiry_addr::permission_expiry_test {
    use permission_expiry_addr::permission_expiry;
    use std::string;
    use aptos_framework::timestamp;

    #[test(admin = @permission_expiry_addr)]
    public fun test_init_and_grant_permission(admin: &signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing();
        
        // Initialize the permission registry
        permission_expiry::init_module_for_test(admin);
        
        // Grant a permission
        let user_addr = @0x123;
        let permission_type = string::utf8(b"READ_ACCESS");
        let expires_at = timestamp::now_seconds() + 3600; // 1 hour from now
        
        permission_expiry::grant_permission(
            admin,
            user_addr,
            permission_type,
            expires_at
        );
        
        // Check if permission is valid
        let is_valid = permission_expiry::is_permission_valid(user_addr, permission_type);
        assert!(is_valid, 1);
    }

    #[test(admin = @permission_expiry_addr)]
    public fun test_permission_expiry(admin: &signer) {
        // Initialize timestamp for testing
        timestamp::set_time_has_started_for_testing();
        
        // Initialize the permission registry
        permission_expiry::init_module_for_test(admin);
        
        let user_addr = @0x123;
        let permission_type = string::utf8(b"WRITE_ACCESS");
        let expires_at = timestamp::now_seconds() + 1; // Expires in 1 second
        
        // Grant permission
        permission_expiry::grant_permission(
            admin,
            user_addr,
            permission_type,
            expires_at
        );
        
        // Should be valid now
        assert!(permission_expiry::is_permission_valid(user_addr, permission_type), 1);
        
        // Fast forward time
        timestamp::fast_forward_seconds(2);
        
        // Should be expired now
        assert!(!permission_expiry::is_permission_valid(user_addr, permission_type), 2);
    }
}
