const { ethers } = require("hardhat");

async function main() {
  const tokens = [
    // {
    //   symbol: "rCATS",
    //   price: "0.001",
    //   address: "0x7C99Ee575CdA71dB0cd379Ca672719fF453205b8",
    // },
    {
      symbol: "rEYES",
      price: "0.001",
      address: "0x1c54306bAb1c273C118110eDD42804bE6B0Dc974",
    },
  ];

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Je deploi le contract
  const Oracle = await ethers.getContractFactory("MyOracle");
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy();

  await dex.deposit({ value: ethers.utils.parseEther("0.1") });

  console.log("Dex address: ", dex.address);

  await Promise.all(
    tokens.map(async function (token) {
      const oracle = await Oracle.deploy(ethers.utils.parseEther(token.price));
      console.log(oracle.address);
      await dex.setToken(token.symbol, token.address);
      await dex.setOracle(token.symbol, oracle.address);
      console.log(`Oracle of ${token.symbol} is ${oracle}`);
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
