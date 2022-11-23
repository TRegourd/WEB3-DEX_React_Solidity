async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Je deploi le contract
  const NFT = await ethers.getContractFactory("MyAwesomeNFT");
  const nft = await NFT.deploy();

  // const Token = await ethers.getContractFactory("RewardToken");
  // const token = await Token.deploy();

  // const Staking = await ethers.getContractFactory("NFTStaking");
  // const staking = await Staking.deploy();

  // Je peux interagir avec
  console.log("NFT Contract address:", nft.address);
  // console.log("Token Contract address:", token.address);
  // console.log("Staking Contract address:", staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
