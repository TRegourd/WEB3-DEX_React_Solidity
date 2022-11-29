const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Je deploie le Token 1
  const Token1 = await ethers.getContractFactory("Token1");
  const token1 = await Token1.deploy();

  // Je deploie le Token 2
  const Token2 = await ethers.getContractFactory("Token2");
  const token2 = await Token2.deploy();

  // Je peux interagir avec
  console.log("Token1 Contract address:", token1.address);
  console.log("Token1 Contract address:", token2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
