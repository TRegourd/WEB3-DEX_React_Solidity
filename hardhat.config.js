require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

const DEV_PRIVATE_KEY = process.env.PRIVATE_KEY;
const DEV_ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${DEV_ALCHEMY_API_KEY}`,
      accounts: [`${DEV_PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "EUR",
    gasPrice: 21,
  },
};
