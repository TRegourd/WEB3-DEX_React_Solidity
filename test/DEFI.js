const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DEFI Deployment", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployment() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Token1 = await ethers.getContractFactory("Token1");
    const Token2 = await ethers.getContractFactory("Token2");
    const Oracle = await ethers.getContractFactory("MyOracle");
    const DEX = await ethers.getContractFactory("DEX");

    const token1 = await Token1.deploy();
    const token2 = await Token2.deploy();
    const oracle1 = await Oracle.deploy();
    const oracle2 = await Oracle.deploy();
    const dex = await DEX.deploy();

    return { token1, token2, oracle1, oracle2, dex, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Mint 100 TKN1 for OtherAccount", async function () {
      const { token1, owner, otherAccount } = await loadFixture(deployment);

      const balanceBeforeMint = await token1.balanceOf(otherAccount.address);
      const totalSupplyBeforeMint = await token1.totalSupply();
      await token1.connect(owner).mint(otherAccount.address, 100);
      const balanceAfterMint = await token1.balanceOf(otherAccount.address);
      const totalSupplyAfterMint = await token1.totalSupply();

      expect(balanceBeforeMint).to.equal(0);
      expect(balanceAfterMint).to.equal(100);
      expect(totalSupplyAfterMint).to.equal(
        Number(totalSupplyBeforeMint) + Number(100)
      );
    });

    it("Should not Mint from other account than owner", async function () {
      const { token1, otherAccount } = await loadFixture(deployment);

      await expect(
        token1.connect(otherAccount).mint(otherAccount.address, 100)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should calculate conversion ratio from Oracles", async function () {
      const { owner, oracle1, oracle2 } = await loadFixture(deployment);

      await oracle1
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.001"));
      await oracle2
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.0001"));

      const priceTKN1 = await oracle1.getPrice();
      const priceTKN2 = await oracle2.getPrice();

      expect(priceTKN1 / priceTKN2).to.equal(10);
    });
  });

  describe("Swap", function () {
    it("Should Swap 1 TKN1 to 10 TKN2", async function () {
      const { token1, token2, oracle1, oracle2, dex, owner, otherAccount } =
        await loadFixture(deployment);

      // Setting tokens price
      await oracle1
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.001"));
      await oracle2
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.0001"));

      // Connecting Contracts together
      await dex.connect(owner).setOracle("TKN1", oracle1.address);
      await dex.connect(owner).setOracle("TKN2", oracle2.address);
      await dex.connect(owner).setToken("TKN1", token1.address);
      await dex.connect(owner).setToken("TKN2", token2.address);

      // Minting Tokens for OtherAccount
      await token1.connect(owner).mint(otherAccount.address, 10);
      await token2.connect(owner).mint(otherAccount.address, 10);

      // Approving DEX from owner to spend Token1 & Token 2 and Provinding Liquidity to DEX
      await token1.connect(owner).approve(dex.address, 100);
      await token2.connect(owner).approve(dex.address, 100);
      const ownerBalanceToken1BeforeLiquidityProviding = await token1.balanceOf(
        owner.address
      );
      await dex.connect(owner).addLiquidity("TKN1", 100);
      const ownerBalanceToken1AfterLiquidityProviding = await token1.balanceOf(
        owner.address
      );

      // Verifiying owner balance after providing liquidity to DEX
      expect(ownerBalanceToken1AfterLiquidityProviding).to.equal(
        ownerBalanceToken1BeforeLiquidityProviding - 100
      );
      await dex.connect(owner).addLiquidity("TKN2", 100);

      // Approving DEX from otheraccount to spend Token1
      await token1.connect(otherAccount).approve(dex.address, 10);

      // Balances before Swap
      const otherAccountBalanceToken1BeforeSwap = await token1.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken1BeforeSwap = await token1.balanceOf(dex.address);
      const otherAccountBalanceToken2BeforeSwap = await token2.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken2BeforeSwap = await token2.balanceOf(dex.address);

      // Swapping tokens
      await dex.connect(otherAccount).swap("TKN1", "TKN2", 1);

      // Balances after Swap
      const otherAccountBalanceToken1AfterSwap = await token1.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken1AfterSwap = await token1.balanceOf(dex.address);
      const otherAccountBalanceToken2AfterSwap = await token2.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken2AfterSwap = await token2.balanceOf(dex.address);

      // Verifiying otherAccount and dex balances after swapping
      const priceTKN1 = await oracle1.getPrice();
      const priceTKN2 = await oracle2.getPrice();

      const swapRatio = priceTKN1 / priceTKN2;

      console.log(
        "Token1 DEX balances : before " +
          dexBalanceToken1BeforeSwap +
          ", after " +
          dexBalanceToken1AfterSwap
      );
      console.log(
        "Token1 OtherAccount balances : before " +
          otherAccountBalanceToken1BeforeSwap +
          ", after " +
          otherAccountBalanceToken1AfterSwap
      );
      console.log(
        "Token2 DEX balances : before " +
          dexBalanceToken2BeforeSwap +
          ", after " +
          dexBalanceToken2AfterSwap
      );
      console.log(
        "Token2 OtherAccount balances : before " +
          otherAccountBalanceToken2BeforeSwap +
          ", after " +
          otherAccountBalanceToken2AfterSwap
      );

      expect(otherAccountBalanceToken1AfterSwap).to.equal(
        Number(otherAccountBalanceToken1BeforeSwap) - 1
      );
      expect(otherAccountBalanceToken2AfterSwap).to.equal(
        Number(otherAccountBalanceToken2BeforeSwap) + 1 * swapRatio
      );
      expect(dexBalanceToken1AfterSwap).to.equal(
        Number(dexBalanceToken1BeforeSwap) + 1
      );
      expect(dexBalanceToken2AfterSwap).to.equal(
        Number(dexBalanceToken2BeforeSwap) - 1 * swapRatio
      );
    });
    it("Should Swap 10 TKN1 to 1 TKN2", async function () {
      const { token1, token2, oracle1, oracle2, dex, owner, otherAccount } =
        await loadFixture(deployment);

      // Setting tokens price
      await oracle1
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.001"));
      await oracle2
        .connect(owner)
        .updatePrice(ethers.utils.parseEther("0.0001"));

      // Connecting Contracts together
      await dex.connect(owner).setOracle("TKN1", oracle1.address);
      await dex.connect(owner).setOracle("TKN2", oracle2.address);
      await dex.connect(owner).setToken("TKN1", token1.address);
      await dex.connect(owner).setToken("TKN2", token2.address);

      // Minting Tokens for OtherAccount
      await token1.connect(owner).mint(otherAccount.address, 100);
      await token2.connect(owner).mint(otherAccount.address, 100);

      // Approving DEX from owner to spend Token1 & Token 2 and Provinding Liquidity to DEX
      await token1.connect(owner).approve(dex.address, 100);
      await token2.connect(owner).approve(dex.address, 100);
      const ownerBalanceToken1BeforeLiquidityProviding = await token1.balanceOf(
        owner.address
      );
      await dex.connect(owner).addLiquidity("TKN1", 100);
      const ownerBalanceToken1AfterLiquidityProviding = await token1.balanceOf(
        owner.address
      );

      // Verifiying owner balance after providing liquidity to DEX
      expect(ownerBalanceToken1AfterLiquidityProviding).to.equal(
        ownerBalanceToken1BeforeLiquidityProviding - 100
      );
      await dex.connect(owner).addLiquidity("TKN2", 100);

      // Approving DEX from otheraccount to spend Token2
      await token2.connect(otherAccount).approve(dex.address, 10);

      // Balances before Swap
      const otherAccountBalanceToken1BeforeSwap = await token1.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken1BeforeSwap = await token1.balanceOf(dex.address);
      const otherAccountBalanceToken2BeforeSwap = await token2.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken2BeforeSwap = await token2.balanceOf(dex.address);

      // Swapping tokens
      await dex.connect(otherAccount).swap("TKN2", "TKN1", 10);

      // Balances after Swap
      const otherAccountBalanceToken1AfterSwap = await token1.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken1AfterSwap = await token1.balanceOf(dex.address);
      const otherAccountBalanceToken2AfterSwap = await token2.balanceOf(
        otherAccount.address
      );
      const dexBalanceToken2AfterSwap = await token2.balanceOf(dex.address);

      // Verifiying otherAccount and dex balances after swapping
      const priceTKN1 = await oracle1.getPrice();
      const priceTKN2 = await oracle2.getPrice();

      const swapRatio = priceTKN2 / priceTKN1;
      console.log("Swap Ratio : ", swapRatio);

      console.log(
        "Token1 DEX balances : before " +
          dexBalanceToken1BeforeSwap +
          ", after " +
          dexBalanceToken1AfterSwap
      );
      console.log(
        "Token1 OtherAccount balances : before " +
          otherAccountBalanceToken1BeforeSwap +
          ", after " +
          otherAccountBalanceToken1AfterSwap
      );
      console.log(
        "Token2 DEX balances : before " +
          dexBalanceToken2BeforeSwap +
          ", after " +
          dexBalanceToken2AfterSwap
      );
      console.log(
        "Token2 OtherAccount balances : before " +
          otherAccountBalanceToken2BeforeSwap +
          ", after " +
          otherAccountBalanceToken2AfterSwap
      );

      // FIXME : Find a way to calculate swapRatio when ratio is a float number.

      // expect(otherAccountBalanceToken1AfterSwap).to.equal(
      //   Number(otherAccountBalanceToken1BeforeSwap) + 10 * swapRatio
      // );
      // expect(otherAccountBalanceToken2AfterSwap).to.equal(
      //   Number(otherAccountBalanceToken2BeforeSwap) - 10
      // );
      // expect(dexBalanceToken1AfterSwap).to.equal(
      //   Number(dexBalanceToken1BeforeSwap) - 10 * swapRatio
      // );
      // expect(dexBalanceToken2AfterSwap).to.equal(
      //   Number(dexBalanceToken2BeforeSwap) + 10 * swapRatio
      // );
    });
  });
});
