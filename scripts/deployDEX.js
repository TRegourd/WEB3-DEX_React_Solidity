const { ethers } = require("hardhat");

async function main() {
  const tokens = [
    {
      symbol: "rCATS",
      price: "1",
      address: "0x7C99Ee575CdA71dB0cd379Ca672719fF453205b8",
    },
    {
      symbol: "rEYES",
      price: "1",
      address: "0x6B8063F7894082a603f8BE5b37a8c2ff0435Aa33",
    },
  ];

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Je deploi le contract
  const Oracle = await ethers.getContractFactory("MyOracle");
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy();

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
