import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import artifacts from "../../artifacts";

export default function FarmingCard({ collection }) {
  const [collectionData, setCollectionData] = useState();
  const [stakingUserData, setStakingUserData] = useState();
  const [stakingCollectionData, setStakingCollectionData] = useState();
  const [stakeId, setStakeId] = useState();
  const [unStakeId, setUnStakeId] = useState();
  const [approved, setApproved] = useState();

  const NftContractAddress = collection.NftsAddress;
  const StakingContractAddress = collection.StakingAddress;
  const RewardContractAddress = collection.RewardsAddress;

  const NFTcontractArtifact = artifacts[collection?.NftsContract];
  const StakingContractArtifact = artifacts[collection?.StakingContract];
  const RewardContractArtifact = artifacts[collection?.RewardsContract];

  useEffect(() => {
    fetchCollectionData();
    fetchUserStakingUserData();
    fetchStakingCollectionData();
    // importArtifacts();
  }, []);

  async function fetchCollectionData() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const NFTContract = new ethers.Contract(
        NftContractAddress,
        NFTcontractArtifact.abi,
        provider
      );

      try {
        const userBalance = await NFTContract.balanceOf(accounts[0]);

        let userItems = [];
        for (let i = 0; i < userBalance; i++) {
          userItems[i] = await NFTContract.tokenOfOwnerByIndex(accounts[0], i);
        }

        const items = await Promise.all(
          userItems.map(async function (item) {
            return await fetchItem(NFTContract, item);
          })
        );

        setCollectionData(items);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function fetchStakingCollectionData() {
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
        const rewardBalance = await RewardContract.balanceOf(accounts[0]);

        const data = {
          totalContractStaking: parseInt(totalContractStaking._hex, 16),
          rewardToken: rewardToken,
          rewardBalance: (
            parseInt(rewardBalance._hex, 16) / ethers.utils.parseEther("1")
          ).toFixed(8),
        };

        setStakingCollectionData(data);

        const isApproved = await NFTContract.isApprovedForAll(
          accounts[0],
          StakingContract.address
        );

        setApproved(isApproved);
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
        const totalUserStaking = await StakingContract.getStakedTokens({
          from: accounts[0],
        });

        const items = await Promise.all(
          totalUserStaking.map(async function (item) {
            return await fetchItem(NFTContract, item);
          })
        );
        let pendingRewards = 0;
        try {
          await Promise.all(
            totalUserStaking.map(async function (item) {
              const itemReward = await StakingContract.getPendingRewards(item, {
                from: accounts[0],
              });

              pendingRewards +=
                Number(itemReward) / ethers.utils.parseUnits("1", "gwei");
            })
          );
        } catch (err) {
          console.log(err);
        }

        setStakingUserData({ items: items, pendingRewards: pendingRewards });
      } catch (err) {
        console.log(err);
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

  async function stake() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,
        signer
      );
      try {
        let overrides = {
          from: accounts[0],
        };
        const transaction = await contract.stake(stakeId, overrides);

        toast.promise(transaction.wait(), {
          pending: "Staking in progress 🔗",
          success: "NFT Staked 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

        fetchCollectionData();
        fetchUserStakingUserData();
        fetchStakingCollectionData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function unStake() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,
        signer
      );
      try {
        const transaction = await contract.unstake(unStakeId);

        toast.promise(transaction.wait(), {
          pending: "UnStaking in progress 🔗",
          success: "NFT unStaked 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

        setUnStakeId("");
        fetchCollectionData();
        fetchUserStakingUserData();
        fetchStakingCollectionData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function claim() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const StakingContract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,
        signer
      );
      try {
        const transaction = await StakingContract.claimAll();

        toast.promise(transaction.wait(), {
          pending: "Claiming in progress 🔗",
          success: "Rewards Claimed 👌",
          error: "Transaction rejected 🤯",
        });

        await transaction.wait();

        fetchCollectionData();
        fetchUserStakingUserData();
        fetchStakingCollectionData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function setApprovalForAll() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const StakingContract = new ethers.Contract(
        StakingContractAddress,
        StakingContractArtifact.abi,

        signer
      );
      const NFTContract = new ethers.Contract(
        NftContractAddress,
        NFTcontractArtifact.abi,

        signer
      );
      try {
        const transaction = await NFTContract.setApprovalForAll(
          StakingContract.address,
          { from: accounts[0] }
        );

        toast.promise(transaction.wait(), {
          pending: "Approving in progress 🔗",
          success: "Approved 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

        fetchStakingCollectionData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const handleUnStakeChange = (event) => {
    setUnStakeId(event.target?.value);
  };

  const handleStakeChange = (event) => {
    setStakeId(event.target?.value);
  };

  return (
    <div key={`fard_${collection.id}`} className="single-accordion-item">
      {/* Card Header */}
      {/* <pre>{JSON.stringify(stakeId, null, 2)}</pre> */}
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
                    <h4 className="m-0">{collection.name}</h4>
                    <span className="d-inline-block mt-2">
                      {collection.symbol}
                    </span>
                    <p>{collection.description}</p>
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
                <span>{stakingUserData?.items.length}</span>
                <span>Stacked</span>
              </div>
              <div className="col single-item">
                <span>{stakingCollectionData?.rewardToken}</span>
                <span>Earn</span>
              </div>

              <div className="col single-item">
                <span>{stakingCollectionData?.rewardBalance}</span>
                <span>Reward Balance</span>
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
          {approved && (
            <div className="row">
              {/* Single Staking Item */}
              <div className="col-12 col-md-4 single-staking-item input-box">
                <span className="item-title mb-2">Stake</span>
                <div className="input-area d-flex flex-column">
                  <select
                    onChange={handleStakeChange}
                    name="tokenId"
                    id="tokenId-select"
                  >
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

                  <button onClick={stake} className="btn input-btn mt-2">
                    Stake
                  </button>
                </div>
              </div>
              {/* Single Staking Item */}
              <div className="col-12 col-md-4 single-staking-item input-box">
                <div className="input-area d-flex flex-column">
                  <span className="item-title mb-2">UnStake</span>
                  <select
                    onChange={handleUnStakeChange}
                    name="tokenId"
                    id="tokenId-select"
                  >
                    <option value="">--Please choose NFT--</option>
                    {stakingUserData?.items &&
                      stakingUserData.items.map((token) => {
                        return (
                          <option key={token.tokenId} value={token.tokenId}>
                            {token.name}
                          </option>
                        );
                      })}
                  </select>

                  <button onClick={unStake} className="btn input-btn mt-2">
                    UnStake
                  </button>
                </div>
              </div>
              {/* Single Staking Item */}
              <div className="col-12 col-md-4 single-staking-item input-box">
                <span className="item-title mb-2">Pending Rewards</span>
                <div className="input-area d-flex flex-column">
                  <h4 className="price m-0">
                    {stakingUserData?.pendingRewards}{" "}
                    {stakingCollectionData?.rewardToken}
                  </h4>
                  <span className="reward my-2"></span>
                  <button onClick={claim} className="btn input-btn mt-2">
                    <i className="" /> Claim
                  </button>
                </div>
              </div>
            </div>
          )}
          {!approved && (
            <div className="row">
              {/* Single Staking Item */}
              <div className="col-12 col-md-4 single-staking-item input-box">
                <span className="item-title mb-2">
                  Approve Staking Contract
                </span>
                <div className="input-area d-flex flex-column">
                  <button
                    onClick={setApprovalForAll}
                    className="btn input-btn mt-2"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
