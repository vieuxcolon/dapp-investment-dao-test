#!/bin/bash
set -e

echo "=== Docker Test: Compile DAO Contracts ==="

# Navigate to contracts directory
cd /workspace/packages/contracts

# Install npm dependencies if not already
if [ ! -d "node_modules" ]; then
  echo "Installing npm dependencies..."
  npm install
fi

# Compile contracts
echo "Compiling contracts with Hardhat..."
npx hardhat compile

echo "✅ Contracts compiled successfully!"

