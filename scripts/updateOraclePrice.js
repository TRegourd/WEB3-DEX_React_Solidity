const { hre, ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x31fB8B3fea1e09ae2d9c6D5DAE9b1B7C3f8Dfc54";
  const oracle = await hre.ethers.getContractAt("MyOracle", contractAddress);
  console.log("Transaction pending...");
  await oracle.updatePrice(ethers.utils.parseEther("0.01"));

  console.log("Price updated");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
