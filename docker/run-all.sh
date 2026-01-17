#!/bin/bash
set -e
echo "=== Docker Test: Compile & Deploy DAO Contracts ==="

cd /workspace/packages/contracts

echo "Installing npm dependencies..."
npm install

echo "Compiling contracts with Hardhat..."
npx hardhat compile

echo "Deploying contracts..."
npx hardhat run scripts/deploy.ts --network localhost

echo "✅ Contracts compiled and deployed successfully!"
