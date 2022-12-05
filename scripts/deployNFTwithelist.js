const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteList = require("../src/data/whiteList.json");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Init of the merkleTree
  let addressList = [];
  whiteList.map((entry) => {
    addressList.push(entry.address);
  });
  const leaves = addressList.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  // Je deploi le contract
  const NFT = await ethers.getContractFactory("MyAwesomeNFT_witheList");
  const nft = await NFT.deploy(root, "Hash Eyes", "EYES");

  const Token = await ethers.getContractFactory("RewardToken");
  const token = await Token.deploy("EYES Reward", "rEYES");

  const Staking = await ethers.getContractFactory("NFTStaking");
  const staking = await Staking.deploy();

  // // Je peux interagir avec
  console.log("NFT Contract address:", nft.address);
  console.log("Token Contract address:", token.address);
  console.log("Staking Contract address:", staking.address);

  await token.setStakingContract(staking.address);
  await staking.setRewardToken(token.address);
  await staking.setNft(nft.address);
  await nft.setBaseUri(
    "ipfs://bafybeigfasdbjxa3dazcge2br2sggezfsefh47d2dhpfeytvptbz2azb3m/"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
