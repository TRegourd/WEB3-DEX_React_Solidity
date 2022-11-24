import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import NFTcontractArtifact from "../../artifacts/contracts/myAwesomeNFT.sol/MyAwesomeNFT.json";
import StakingContractArtifact from "../../artifacts/contracts/Staking.sol/NFTStaking.json";
import RewardContractArtifact from "../../artifacts/contracts/RewardToken.sol/RewardToken.json";

export default function FarmingCard({ collection }) {
  const [collectionData, setCollectionData] = useState();
  const [stakingUserData, setStakingUserData] = useState();
  const [stakingCollectionData, setStakingCollectionData] = useState();
  const NftContractAddress = collection.NftsAddress;
  const StakingContractAddress = collection.StakingAddress;
  const RewardContractAddress = collection.RewardsAddress;

  const item = {
    id: 3,
    img: "/img/thumb_3.png",
    img_1: "/img/thumb_6.png",
    title: "Participate IGO Stake",
    title_1: "Farming Stake",
    category: "Game",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC making it over.",
    staked: "0 LP",
    earned: "0.00 Game",
    apy: "25%",
    price: "$9,524,07.19",
    value: "$24571,957.94",
    input_title_1: "Deposit",
    input_title_2: "Withdraw",
    input_btn_1: "Approve",
    input_btn_2: "Withdraw",
    reward_title: "Pending rewards",
    reward: "0.00 BUSD",
    reward_content: "Rewards are depleted, ask admins to fund it.",
    actionBtn: "Claim",
  };

  useEffect(() => {
    fetchCollectionData();
    fetchUserStakingUserData();
    fetchCollectionStakingUserData();
  }, []);

  async function fetchCollectionData() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        NftContractAddress,
        NFTcontractArtifact.abi,
        provider
      );

      try {
        const userBalance = await contract.balanceOf(accounts[0]);

        let userItems = [];
        for (let i = 0; i < userBalance; i++) {
          userItems[i] = await contract.tokenOfOwnerByIndex(accounts[0], i);
        }

        const items = await Promise.all(
          userItems.map(async function (item) {
            return await fetchItem(contract, item);
          })
        );

        setCollectionData(items);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function fetchCollectionStakingUserData() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const StakingContract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,
        provider
      );
      const NFTContract = new ethers.Contract(
        NftContractAddress,
        NFTcontractArtifact.abi,
        provider
      );

      const RewardContract = new ethers.Contract(
        RewardContractAddress,
        RewardContractArtifact.abi,
        provider
      );

      try {
        const totalContractStaking = await StakingContract.totalStaking();
        const rewardToken = await RewardContract.symbol();

        const data = {
          totalContractStaking: parseInt(totalContractStaking._hex, 16),
          rewardToken: rewardToken,
        };

        setStakingCollectionData(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function fetchUserStakingUserData() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const StakingContract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,
        provider
      );
      const NFTContract = new ethers.Contract(
        NftContractAddress,
        NFTcontractArtifact.abi,
        provider
      );

      try {
        const totalContractStaking = await StakingContract.totalStaking();
        const totalUserStaking = await StakingContract.getStakedTokens({
          from: accounts[0],
        });

        console.log(totalContractStaking, totalUserStaking);

        const items = await Promise.all(
          totalUserStaking.map(async function (item) {
            return await fetchItem(NFTContract, item);
          })
        );

        setStakingUserData(items);
        console.log(items);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function fetchItem(contract, item) {
    const link =
      collection?.openSeaBaseUrl +
      collection.NftsAddress +
      "/" +
      parseInt(item._hex, 16);

    const blockchainLogo = collection.blockchainLogo;

    const tokenId = parseInt(item._hex, 16);
    const tokenUri = await contract.tokenURI(item._hex);
    const HttpTokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const meta = await axios.get(HttpTokenUri);
    const HttpTokenImage = meta.data.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    const tokenData = {
      ...meta.data,
      tokenId: tokenId,
      link: link,
      image: HttpTokenImage,
      blockchainLogo: blockchainLogo,
    };
    return tokenData;
  }
  console.log(collectionData);
  return (
    <div key={`fard_${collection.id}`} className="single-accordion-item">
      {/* Card Header */}
      <div className="card-header bg-inherit border-0 p-0">
        <h2 className="m-0">
          <button
            className="btn staking-btn d-block text-left w-100 py-4"
            type="button"
            data-toggle="collapse"
            data-target={"#collapse" + collection.id}
          >
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="media flex-column flex-md-row">
                  <img
                    className="avatar-max-lg"
                    src={collection.collectionLogo}
                    alt=""
                  />
                  <div className="content media-body mt-4 mt-md-0 ml-md-4">
                    <h4 className="m-0">{item.title_1}</h4>
                    <span className="d-inline-block mt-2">{item.category}</span>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row staking-info align-items-center justify-content-center mt-4 mt-md-5">
              <div className="col single-item">
                <span>{collectionData?.length}</span>
                <span>Available</span>
              </div>
              <div className="col single-item">
                <span>{stakingUserData?.length}</span>
                <span>Stacked</span>
              </div>
              <div className="col single-item">
                <span>{stakingCollectionData?.rewardToken}</span>
                <span>Earn</span>
              </div>

              <div className="col single-item">
                <span>{item.price}</span>
                <span>LP Price</span>
              </div>
              <div className="col single-item">
                <span>{stakingCollectionData?.totalContractStaking}</span>
                <span>Total contract Locked</span>
              </div>
            </div>
          </button>
        </h2>
      </div>
      <div
        id={"collapse" + collection.id}
        className="collapse"
        data-parent="#gameon-accordion"
      >
        {/* Card Body */}
        <div className="card-body">
          <div className="row">
            {/* Single Staking Item */}
            <div className="col-12 col-md-4 single-staking-item input-box">
              <span className="item-title mb-2">Stake</span>
              <div className="input-area d-flex flex-column">
                <select name="tokenId" id="tokenId-select">
                  <option value="">--Please choose NFT--</option>
                  {collectionData &&
                    collectionData.map((token) => {
                      return (
                        <option key={token.tokenId} value={token.tokenId}>
                          {token.name}
                        </option>
                      );
                    })}
                </select>

                <a href="#" className="btn input-btn mt-2">
                  Stake
                </a>
              </div>
            </div>
            {/* Single Staking Item */}
            <div className="col-12 col-md-4 single-staking-item input-box">
              <div className="input-area d-flex flex-column">
                <span className="item-title mb-2">UnStake</span>
                <select name="tokenId" id="tokenId-select">
                  <option value="">--Please choose NFT--</option>
                  {stakingUserData &&
                    stakingUserData.map((token) => {
                      return (
                        <option key={token.tokenId} value={token.tokenId}>
                          {token.name}
                        </option>
                      );
                    })}
                </select>

                <a href="#" className="btn input-btn mt-2">
                  UnStake
                </a>
              </div>
            </div>
            {/* Single Staking Item */}
            <div className="col-12 col-md-4 single-staking-item input-box">
              <span className="item-title mb-2">{item.reward_title}</span>
              <div className="input-area d-flex flex-column">
                <h4 className="price m-0">
                  0.0 {stakingCollectionData?.rewardToken}
                </h4>
                <span className="reward my-2"></span>
                <a href="/login" className="btn input-btn mt-2">
                  <i className="fa-solid fa-lock mr-1" /> {item.actionBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
