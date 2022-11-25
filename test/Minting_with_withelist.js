const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteList = require("../scripts/whiteList.json");
const { ethers } = require("hardhat");

describe("White List Minting", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployment() {
    // Contracts are deployed using the first signer/account by default
    const [owner, approvedAccount, notApprovedAccount] =
      await ethers.getSigners();

    // Init of the merkleTree
    let addressList = [];
    whiteList.map((entry) => {
      addressList.push(entry.address);
    });
    const leaves = addressList.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    const MyAwesomeNFT = await ethers.getContractFactory(
      "MyAwesomeNFT_witheList"
    );
    const deployedContract = await MyAwesomeNFT.deploy(root);

    const tokenPrice = 0.001;
    const maxSupply = 10;

    await deployedContract.setBaseUri(
      "ipfs://QmNv3Cxqo3dibpXcp7PdJZWg6gGGRdh1W33uN7Nv1JTqp2/"
    );

    return {
      deployedContract,
      owner,
      approvedAccount,
      notApprovedAccount,
      tree,
      tokenPrice,
      maxSupply,
    };
  }

  describe("Deployment", function () {
    it("Should Mint one NFT with an approved account", async function () {
      const { deployedContract, tree, approvedAccount } = await loadFixture(
        deployment
      );
      const balanceBeforeMint = await deployedContract.balanceOf(
        approvedAccount.address
      );

      const leaf = keccak256(approvedAccount.address);
      const proof = tree.getHexProof(leaf);
      await deployedContract
        .connect(approvedAccount)
        .whitheListMint(proof, { value: ethers.utils.parseEther("0.001") });
      const balanceAfterMint = await deployedContract.balanceOf(
        approvedAccount.address
      );
      const nftOwner = await deployedContract.ownerOf(1);

      expect(balanceBeforeMint).to.equal(0);
      expect(balanceAfterMint).to.equal(1);
      expect(nftOwner).to.equal(approvedAccount.address);
    });

    it("Should not Mint with a not approved account", async function () {
      const { deployedContract, tree, notApprovedAccount } = await loadFixture(
        deployment
      );
      const leaf = keccak256(notApprovedAccount.address);
      const proof = tree.getHexProof(leaf);
      await expect(
        deployedContract
          .connect(notApprovedAccount)
          .whitheListMint(proof, { value: ethers.utils.parseEther("0.001") })
      ).to.be.revertedWith("Not on the whitelist");
    });

    it("Should not Mint twice from approved account", async function () {
      const { deployedContract, tree, approvedAccount } = await loadFixture(
        deployment
      );
      const leaf = keccak256(approvedAccount.address);
      const proof = tree.getHexProof(leaf);
      await deployedContract
        .connect(approvedAccount)
        .whitheListMint(proof, { value: ethers.utils.parseEther("0.001") });
      await expect(
        deployedContract
          .connect(approvedAccount)
          .whitheListMint(proof, { value: ethers.utils.parseEther("0.001") })
      ).to.be.revertedWith("Already claimed");
    });
  });
});
