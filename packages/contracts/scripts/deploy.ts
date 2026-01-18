import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  console.log("=== Deploying DAO Contracts ===");

  const initialSupply = ethers.parseEther("1000"); // 1000 tokens

  // Deploy InvestmentToken
  const InvestmentToken = await ethers.getContractFactory("InvestmentToken");
  const investmentToken = await InvestmentToken.deploy(initialSupply);
  await investmentToken.deployed();
  console.log("InvestmentToken deployed at", investmentToken.address);

  // Deploy Governance (pass token address)
  const Governance = await ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(investmentToken.address);
  await governance.deployed();
  console.log("Governance deployed at", governance.address);

  // Deploy Treasury (pass governance address)
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(governance.address);
  await treasury.deployed();
  console.log("Treasury deployed at", treasury.address);

  // Absolute path for deployments directory
  const workspaceDir = path.resolve(__dirname, "..");
  const deploymentsDir = path.join(workspaceDir, "deployments");

  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const addresses = {
    InvestmentToken: investmentToken.address,
    Governance: governance.address,
    Treasury: treasury.address,
  };

  const filePath = path.join(deploymentsDir, "addresses.json");
  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));

  console.log("✅ Deployment addresses saved to:", filePath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
