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
    const [owner, approvedAccount, notApprovedAccount, otherAccount] =
      await ethers.getSigners();

    // Init of the merkleTree
    let addressList = [];
    whiteList.map((entry) => {
      addressList.push(entry.address);
    });
    const leaves = addressList.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    // Get the contract
    const MyAwesomeNFT = await ethers.getContractFactory(
      "MyAwesomeNFT_witheList"
    );
    // Deploy the contract
    const deployedContract = await MyAwesomeNFT.deploy(root);

    // Set BaseURI for tokens
    await deployedContract.setBaseUri(
      "ipfs://QmNv3Cxqo3dibpXcp7PdJZWg6gGGRdh1W33uN7Nv1JTqp2/"
    );

    return {
      deployedContract,
      owner,
      approvedAccount,
      notApprovedAccount,
      otherAccount,
      tree,
    };
  }

  describe("Test Sequence", function () {
    it("Should Mint one NFT", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );
      const balanceBeforeMint = await deployedContract.balanceOf(
        otherAccount.address
      );
      await deployedContract
        .connect(otherAccount)
        .unitMint({ value: ethers.utils.parseEther("0.001") });
      const balanceAfterMint = await deployedContract.balanceOf(
        otherAccount.address
      );
      const nftOwner = await deployedContract.ownerOf(1);
      const nftURI = await deployedContract.tokenURI(1);

      expect(balanceBeforeMint).to.equal(0);
      expect(balanceAfterMint).to.equal(1);
      expect(nftOwner).to.equal(otherAccount.address);
      expect(nftURI).to.equal(
        "ipfs://QmNv3Cxqo3dibpXcp7PdJZWg6gGGRdh1W33uN7Nv1JTqp2/1.json"
      );
    });

    it("Should Fail if not enough money sent", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );

      await expect(
        deployedContract
          .connect(otherAccount)
          .unitMint({ value: ethers.utils.parseEther("0.0001") })
      ).to.be.revertedWith("Not enough money sent");
    });

    it("Mint multiple NFT", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );
      const balanceBeforeMint = await deployedContract.balanceOf(
        otherAccount.address
      );
      await deployedContract
        .connect(otherAccount)
        .multipleMint(5, { value: ethers.utils.parseEther("0.005") });
      const balanceAfterMint = await deployedContract.balanceOf(
        otherAccount.address
      );

      expect(balanceBeforeMint).to.equal(0);
      expect(balanceAfterMint).to.equal(5);
    });

    it("Should Fail if not enough token remaining", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );
      const balanceBeforeMint = await deployedContract.balanceOf(
        otherAccount.address
      );

      await expect(
        deployedContract
          .connect(otherAccount)
          .multipleMint(11, { value: ethers.utils.parseEther("0.011") })
      ).to.be.revertedWith("Not enough token remaining");
    });

    it("Should Fail if contract is paused", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );
      const balanceBeforeMint = await deployedContract.balanceOf(
        otherAccount.address
      );

      await deployedContract.pause();

      await expect(
        deployedContract
          .connect(otherAccount)
          .unitMint({ value: ethers.utils.parseEther("0.001") })
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Withdraw money from contract", async function () {
      const { deployedContract, owner, otherAccount } = await loadFixture(
        deployment
      );

      let provider = ethers.provider;
      await deployedContract
        .connect(otherAccount)
        .multipleMint(5, { value: ethers.utils.parseEther("0.005") });

      await expect(
        await deployedContract.connect(owner).withdrawMoney()
      ).to.changeEtherBalances(
        [owner, deployedContract],
        [+ethers.utils.parseEther("0.005"), -ethers.utils.parseEther("0.005")]
      );
    });
    it("Should Mint one Free NFT with an approved account", async function () {
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

    it("Should not Mint Free NFT with a not approved account", async function () {
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
