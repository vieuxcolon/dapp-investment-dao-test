#!/bin/bash
echo "=== Docker Test: Compile & Deploy DAO Contracts ==="

# Move to contracts directory
cd /workspace/packages/contracts || exit 1

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Compile contracts
echo "Compiling contracts with Hardhat..."
npx hardhat compile

# Deploy contracts to local Hardhat network
echo "Deploying contracts..."
npx hardhat run scripts/deploy.ts --network localhost

echo "Contracts compiled and deployed successfully!"
