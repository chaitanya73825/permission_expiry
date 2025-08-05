# 🔐 Permission Expiry dApp

A sophisticated permission management system built on the Aptos blockchain with a stunning dark theme UI. This dApp enables time-based permission granting and automatic expiration with enterprise-grade security.

![Permission Expiry dApp](public/aptos.png)

## ✨ Features

### 🚀 Core Functionality

- **Time-Based Permissions**: Grant permissions with automatic expiration
- **Multiple Permission Types**: READ_ACCESS, WRITE_ACCESS, ADMIN_ACCESS, SPECIAL_ACCESS
- **Smart Revocation**: Instant permission revocation capabilities
- **Real-time Status**: Live permission validity checking
- **Blockchain Security**: Immutable permission records on Aptos

### 🎨 Modern UI/UX

- **Dark Theme Design**: Professional dark mode with neon gradients
- **Glassmorphism Effects**: Modern translucent card designs
- **Smooth Animations**: Engaging hover effects and transitions
- **Responsive Layout**: Works perfectly on all device sizes
- **Interactive Components**: Real-time feedback and status updates

### 🔧 Technical Excellence

- **Smart Contract**: Written in Move language, deployed on Aptos Devnet
- **React + TypeScript**: Type-safe frontend development
- **Wallet Integration**: Seamless Aptos wallet connectivity
- **Transaction Handling**: Robust error handling and user feedback
- **View Functions**: Efficient blockchain data querying

## 🏗️ Architecture

### Smart Contract (Move)

```
contract/sources/permission_expiry.move
- Permission granting with expiry timestamps
- Admin-controlled permission management
- Status tracking (ACTIVE, REVOKED, EXPIRED)
- Comprehensive view functions
```

### Frontend (React + TypeScript)

```
frontend/
├── components/          # Reusable UI components
├── view-functions/      # Blockchain interaction
├── utils/              # Helper functions
└── constants.ts        # App configuration
```

## 🚀 Deployed Smart Contract

**Contract Address**: `0x04bed719ed17ca5f75b59b928fa0f112be29bce72dccc287977c4d96a13ba2b5`
**Network**: Aptos Devnet
**Status**: ✅ Active and Functional

## 💻 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Aptos wallet (Petra, Martian, etc.)
- Connection to Aptos Devnet

### Installation

```bash
# Clone the repository
git clone https://github.com/chaitanya73825/permission_expiry.git
cd permission_expiry

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Core Functions

### Permission Management

- **Grant Permission**: Assign time-limited access rights
- **Revoke Permission**: Instantly remove access
- **Check Validity**: Real-time permission status verification
- **View Details**: Complete permission information retrieval

### Admin Features

- **Initialize Registry**: Set up permission management system
- **Admin Verification**: Secure admin role checking
- **Bulk Operations**: Efficient multi-permission handling

## What tools the template uses?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands
- [Vite-pwa](https://vite-pwa-org.netlify.app/)

## What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run dev` - a command to run the frontend locally
- `npm run deploy` - a command to deploy the dapp to Vercel

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.
