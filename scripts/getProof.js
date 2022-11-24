const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteList = require("./whiteList.json");

let addressList = whiteList.map((entry) => {
  return entry.address;
});

const leaves = addressList.map((address) => keccak256(address));
const tree = new MerkleTree(leaves, keccak256, { sort: true });
const root = tree.getHexRoot();

addressList.map((address) => {
  const leafHash = keccak256(address);
  const proof = tree.getHexProof(leafHash);
  console.log(`${address} proof is : ${proof}`);
});
