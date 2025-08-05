# Permission Expiry dApp on Aptos Devnet

This is a decentralized application (dApp) built on Aptos Devnet that allows administrators to grant time-based permissions to wallet addresses. The permissions automatically expire after a defined time period, ensuring secure and auditable access control.

## Features

### Smart Contract Features
- **Initialize Permission Registry**: Set up the permission management system
- **Grant Time-Limited Permissions**: Assign permissions with automatic expiry timestamps
- **Revoke Permissions**: Manually revoke permissions before expiry
- **Permission Validation**: Check if permissions are currently valid (active and not expired)
- **Admin Management**: Only designated admins can grant/revoke permissions
- **Event Logging**: All permission changes are logged as blockchain events

### Frontend Features
- **Wallet Integration**: Supports Petra wallet and other Aptos-compatible wallets
- **Intuitive Interface**: Easy-to-use forms for permission management
- **Real-time Status**: Live updates on permission validity and status
- **Transaction Feedback**: Clear indication of pending, successful, or failed transactions
- **Permission Types**: Predefined permission categories (READ_ACCESS, WRITE_ACCESS, ADMIN_ACCESS, SPECIAL_ACCESS)

## Getting Started

### Prerequisites
- Node.js v16 or higher
- Petra wallet or another Aptos-compatible wallet
- Some APT tokens for transaction fees on Aptos Devnet

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   VITE_APP_NETWORK=devnet
   VITE_MODULE_ADDRESS=<deployed_contract_address>
   ```

### Running the dApp
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5174`
3. Connect your Petra wallet

### Deploying the Smart Contract

#### Testing
Run the Move tests:
```bash
npm run move:test
```

#### Compilation
Compile the Move contract:
```bash
npm run move:compile
```

#### Publishing
Deploy to Aptos Devnet:
```bash
npm run move:publish
```

## Usage Guide

### For Administrators

1. **Initialize the Registry**
   - Connect your wallet
   - Click "Initialize Registry" to set up the permission system
   - You become the admin of the registry

2. **Grant Permissions**
   - Enter the grantee's wallet address
   - Select permission type
   - Set expiry time in hours
   - Add optional metadata
   - Click "Grant Permission"

3. **Revoke Permissions**
   - Enter the grantee's wallet address
   - Select permission type
   - Click "Revoke Permission"

### For Users

1. **Check Permission Status**
   - Enter the grantee's wallet address
   - Select permission type
   - Click "Check Permission"
   - View detailed permission information including:
     - Current validity status
     - Granted by address
     - Grant timestamp
     - Expiry timestamp
     - Metadata

## Permission Types

- **READ_ACCESS**: Basic read permissions
- **WRITE_ACCESS**: Write/modify permissions
- **ADMIN_ACCESS**: Administrative privileges
- **SPECIAL_ACCESS**: Custom access rights

## Technical Architecture

### Smart Contract (Move)
- **Module**: `permission_expiry`
- **Key Structures**:
  - `Permission`: Stores permission details
  - `PermissionRegistry`: Global registry mapping
- **Main Functions**:
  - `initialize()`: Set up the registry
  - `grant_permission()`: Create new permission
  - `revoke_permission()`: Revoke existing permission
  - `is_permission_valid()`: Check validity
  - `view_permission()`: Get permission details

### Frontend (React + TypeScript)
- **Framework**: React with TypeScript
- **Wallet Integration**: Aptos Wallet Adapter
- **UI Components**: Tailwind CSS with custom components
- **State Management**: React hooks
- **Blockchain Interaction**: Aptos TypeScript SDK

## Security Features

1. **Time-Based Expiry**: Permissions automatically become invalid after expiry
2. **Admin-Only Operations**: Only registry admin can grant/revoke permissions
3. **Immutable Records**: All permission changes are recorded on-chain
4. **Event Logging**: Comprehensive event system for auditing

## Event Types

- **PermissionGrantedEvent**: When a permission is granted
- **PermissionRevokedEvent**: When a permission is revoked
- **PermissionExpiredEvent**: When a permission expires (implicit)

## Error Handling

The dApp provides clear error messages for:
- Wallet connection issues
- Transaction failures
- Invalid permission operations
- Network connectivity problems

## Development

### Project Structure
```
├── contract/
│   ├── sources/
│   │   └── permission_expiry.move
│   ├── tests/
│   │   └── test_permission_expiry.move
│   └── Move.toml
├── frontend/
│   ├── components/
│   │   └── PermissionManager.tsx
│   ├── view-functions/
│   │   └── getPermissionInfo.ts
│   └── utils/
│       └── permission_expiry_abi.ts
└── scripts/
    └── move/
        ├── compile.js
        ├── publish.js
        └── test.js
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Submit a pull request

## License
This project is licensed under the Apache 2.0 License.

## Support
For issues and questions:
1. Check the Aptos documentation
2. Review the Move language guide
3. Join the Aptos Discord community

## Roadmap
- [ ] Batch permission operations
- [ ] Permission inheritance
- [ ] Role-based permissions
- [ ] Integration with other dApps
- [ ] Advanced notification system
