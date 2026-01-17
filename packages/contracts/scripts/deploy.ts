import { ethers } from "hardhat";

async function main() {
  console.log("=== Deploying DAO Contracts ===");

  // Deploy InvestmentToken
  const InvestmentToken = await ethers.getContractFactory("InvestmentToken");
  const token = await InvestmentToken.deploy();
  await token.deployed();
  console.log("InvestmentToken deployed at:", token.address);

  // Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(token.address);
  await treasury.deployed();
  console.log("Treasury deployed at:", treasury.address);

  // Deploy Governance
  const Governance = await ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(token.address, treasury.address);
  await governance.deployed();
  console.log("Governance deployed at:", governance.address);

  // Save deployed addresses to JSON
  const fs = require("fs");
  const deployments = {
    InvestmentToken: token.address,
    Treasury: treasury.address,
    Governance: governance.address
  };
  if (!fs.existsSync("./deployments")) {
    fs.mkdirSync("./deployments");
  }
  fs.writeFileSync("./deployments/addresses.json", JSON.stringify(deployments, null, 2));
  console.log("✅ Deployment addresses saved to ./deployments/addresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
