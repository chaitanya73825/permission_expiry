export const PERMISSION_EXPIRY_ABI = {
  "address": "0x1",
  "name": "permission_expiry",
  "friends": [],
  "exposed_functions": [
    {
      "name": "initialize",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer"
      ],
      "return": []
    },
    {
      "name": "grant_permission",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "address",
        "0x1::string::String",
        "u64",
        "0x1::string::String"
      ],
      "return": []
    },
    {
      "name": "revoke_permission",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "address",
        "0x1::string::String"
      ],
      "return": []
    },
    {
      "name": "is_permission_valid",
      "visibility": "public",
      "is_entry": false,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "address",
        "address",
        "0x1::string::String"
      ],
      "return": [
        "bool"
      ]
    },
    {
      "name": "get_permission",
      "visibility": "public",
      "is_entry": false,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "address",
        "address",
        "0x1::string::String"
      ],
      "return": [
        "address",
        "0x1::string::String",
        "u64",
        "address",
        "u64",
        "u8",
        "0x1::string::String"
      ]
    },
    {
      "name": "is_admin",
      "visibility": "public",
      "is_entry": false,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "address",
        "address"
      ],
      "return": [
        "bool"
      ]
    },
    {
      "name": "get_admin",
      "visibility": "public",
      "is_entry": false,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "address"
      ]
    },
    {
      "name": "view_permission",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address",
        "address",
        "0x1::string::String"
      ],
      "return": [
        "0x42::permission_expiry::Permission"
      ]
    },
    {
      "name": "view_is_permission_valid",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address",
        "address",
        "0x1::string::String"
      ],
      "return": [
        "bool"
      ]
    }
  ],
  "structs": [
    {
      "name": "Permission",
      "is_native": false,
      "abilities": [
        "copy",
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "grantee",
          "type": "address"
        },
        {
          "name": "permission_type",
          "type": "0x1::string::String"
        },
        {
          "name": "expiry_timestamp",
          "type": "u64"
        },
        {
          "name": "granted_by",
          "type": "address"
        },
        {
          "name": "granted_at",
          "type": "u64"
        },
        {
          "name": "status",
          "type": "u8"
        },
        {
          "name": "metadata",
          "type": "0x1::string::String"
        }
      ]
    },
    {
      "name": "PermissionGrantedEvent",
      "is_native": false,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "grantee",
          "type": "address"
        },
        {
          "name": "permission_type",
          "type": "0x1::string::String"
        },
        {
          "name": "expiry_timestamp",
          "type": "u64"
        },
        {
          "name": "granted_by",
          "type": "address"
        },
        {
          "name": "granted_at",
          "type": "u64"
        },
        {
          "name": "permission_key",
          "type": "0x1::string::String"
        }
      ]
    },
    {
      "name": "PermissionRevokedEvent",
      "is_native": false,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "grantee",
          "type": "address"
        },
        {
          "name": "permission_type",
          "type": "0x1::string::String"
        },
        {
          "name": "revoked_by",
          "type": "address"
        },
        {
          "name": "revoked_at",
          "type": "u64"
        },
        {
          "name": "permission_key",
          "type": "0x1::string::String"
        }
      ]
    },
    {
      "name": "PermissionExpiredEvent",
      "is_native": false,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "grantee",
          "type": "address"
        },
        {
          "name": "permission_type",
          "type": "0x1::string::String"
        },
        {
          "name": "expired_at",
          "type": "u64"
        },
        {
          "name": "permission_key",
          "type": "0x1::string::String"
        }
      ]
    },
    {
      "name": "PermissionRegistry",
      "is_native": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "permissions",
          "type": "0x1::table::Table<0x1::string::String, 0x42::permission_expiry::Permission>"
        },
        {
          "name": "admin",
          "type": "address"
        },
        {
          "name": "next_id",
          "type": "u64"
        }
      ]
    }
  ]
} as const;
