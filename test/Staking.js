const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const address0 = "0x0000000000000000000000000000000000000000";

describe("NFT Staking", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployment() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("MyAwesomeNFT");
    const nft = await NFT.deploy();

    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();

    const Staking = await ethers.getContractFactory("NFTStaking");
    const staking = await Staking.deploy();

    await rewardToken.setStakingContract(staking.address);
    await staking.setRewardToken(rewardToken.address);
    await staking.setNft(nft.address);

    return { nft, rewardToken, staking, owner, account1, account2 };
  }

  describe("Staking", function () {
    it("Should stake NFT id#1 from account 1", async function () {
      const { nft, rewardToken, staking, owner, account1, account2 } =
        await loadFixture(deployment);

      // Mint one NFT from account1
      await nft
        .connect(account1)
        .unitMint({ value: ethers.utils.parseEther("0.001") });

      expect(await nft.balanceOf(account1.address)).to.equal(1);

      // Aprove Staking contract from account1
      await nft.connect(account1).approve(staking.address, 1);

      // Stake nft1 from account1

      await staking.connect(account1).stake(1);

      const stakedNft1 = await staking.nftsStaked(1);
      expect(stakedNft1.owner).to.equal(account1.address);
    });

    it("Should get rewards without unstaking", async function () {
      const { nft, rewardToken, staking, owner, account1, account2 } =
        await loadFixture(deployment);

      // Mint and stake
      await nft
        .connect(account1)
        .unitMint({ value: ethers.utils.parseEther("0.001") });
      await nft.connect(account1).approve(staking.address, 1);
      await staking.connect(account1).stake(1);

      // Wait for reward
      await timeout(2000);

      // Get reward without unstaking
      await staking.connect(account1).claim(1);
      const reward = await rewardToken.balanceOf(account1.address);
      expect(reward).to.equal(20 * ethers.utils.parseUnits("1", "gwei"));
      const stakedNft1 = await staking.nftsStaked(1);
      expect(stakedNft1.owner).to.equal(account1.address);
    });

    it("Should get all rewards without unstaking", async function () {
      const { nft, rewardToken, staking, owner, account1, account2 } =
        await loadFixture(deployment);

      // Mint and stake
      await nft
        .connect(account1)
        .multipleMint(2, { value: ethers.utils.parseEther("0.002") });

      await nft.connect(account1).setApprovalForAll(staking.address, true);
      await staking.connect(account1).stake(1);
      await staking.connect(account1).stake(2);

      // Wait for reward
      await timeout(2000);

      // Get reward without unstaking
      await staking.connect(account1).claimAll();
      const reward = await rewardToken.balanceOf(account1.address);
      expect(reward).to.equal(50 * ethers.utils.parseUnits("1", "gwei"));
      const stakedNft1 = await staking.nftsStaked(1);
      const stakedNft2 = await staking.nftsStaked(1);
      expect(stakedNft1.owner).to.equal(account1.address);
      expect(stakedNft2.owner).to.equal(account1.address);
    });

    it("Should get rewards and unstake", async function () {
      const { nft, rewardToken, staking, owner, account1, account2 } =
        await loadFixture(deployment);

      // Mint and stake
      await nft
        .connect(account1)
        .unitMint({ value: ethers.utils.parseEther("0.001") });
      await nft.connect(account1).approve(staking.address, 1);
      await staking.connect(account1).stake(1);

      // Wait for reward
      await timeout(2000);

      // Get reward while unstaking
      await staking.connect(account1).unstake(1);
      const reward = await rewardToken.balanceOf(account1.address);
      expect(reward).to.equal(20 * ethers.utils.parseUnits("1", "gwei"));
      const stakedNft1 = await staking.nftsStaked(1);
      expect(stakedNft1.owner).to.equal(address0);
    });
  });
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
