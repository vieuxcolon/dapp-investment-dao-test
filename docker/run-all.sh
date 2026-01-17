#!/bin/bash
set -e
echo "=== Docker Test: Compile & Deploy DAO Contracts ==="

cd /workspace/packages/contracts

# Install dependencies only if node_modules is empty
if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

echo "Compiling contracts with Hardhat..."
npx hardhat compile

echo "Deploying contracts..."
npx hardhat run scripts/deploy.ts --network localhost

echo "✅ Contracts compiled and deployed successfully!"
