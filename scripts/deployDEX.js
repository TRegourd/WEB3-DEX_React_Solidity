const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Je deploi le contract
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy();

  // Je peux interagir avec
  console.log("Oracle Contract address:", dex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
