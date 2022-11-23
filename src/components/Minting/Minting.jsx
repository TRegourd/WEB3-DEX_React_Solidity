import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import hiddenImg from "../../assets/images/hidden.jpeg";
import polygonLogo from "../../assets/images/polygon-matic-logo.png";
import contractArtifact from "../../artifacts/contracts/myAwesomeNFT_whitelist.sol/MyAwesomeNFT_witheList.json";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";

import whiteList from "../../data/whiteList.json";
import MerkleTree from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import { AuthContext } from "../../AuthProvider";

function Minting({ collection }) {
  const { currentAccount } = useContext(AuthContext);

  const [data, setData] = useState({});
  const contractAddress = collection.address;

  let addressList = [];
  whiteList.map((entry) => {
    addressList.push(entry.address);
  });
  const isWhiteListed = whiteList.some(
    (entry) => entry.address == currentAccount
  );

  const leaves = addressList.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  useEffect(() => {
    fetchData();
  }, [useLocation()]);

  async function fetchData() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
        provider
      );

      try {
        const price = await contract.tokenPrice();
        const mintedSupply = await contract.totalSupply();
        const maxSupply = await contract.maxSupply();
        if (currentAccount) {
          const alreadyClaimed = await contract.claimedWhiteListNFTs(
            currentAccount
          );
          const object = {
            price: String(price),
            mintedSupply: String(mintedSupply),
            maxSupply: String(maxSupply),
            alreadyClaimed: alreadyClaimed,
          };
          setData(object);
        } else {
          const object = {
            price: String(price),
            mintedSupply: String(mintedSupply),
            maxSupply: String(maxSupply),
          };

          setData(object);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function mint() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
        signer
      );
      try {
        let overrides = {
          from: accounts[0],
          value: data.price,
        };
        const transaction = await contract.unitMint(overrides);
        console.log(transaction);
        console.log("pending");
        toast.promise(transaction.wait(), {
          pending: "Minting in progress 🔗",
          success: "NFT Minted 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();
        console.log("finished");
        fetchData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function whiteListMint() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
        signer
      );

      const leaf = keccak256(accounts[0]);
      const proof = tree.getHexProof(leaf);

      try {
        let overrides = {
          from: accounts[0],
        };
        const transaction = await contract.whitheListMint(proof, overrides);

        console.log(transaction);
        console.log("pending");
        toast.promise(transaction.wait(), {
          pending: "Minting in progress 🔗",
          success: "NFT Minted 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();
        console.log("finished");
        fetchData();
      } catch (err) {
        toast.error("Transaction rejected 🤯");
        console.log(err.message);
      }
    }
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          {/* Intro */}
          <div className="intro text-center">
            <div className="intro-content">
              <span className="intro-text">Collection</span>
              <h3 className="mt-3 mb-0">{collection.description}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="minting-area">
        {isWhiteListed && (
          <div className="card project-card">
            <div className="media">
              <a href={collection?.collectionBaseUrl} target="blank">
                <img
                  className="card-img-top avatar-max-lg"
                  src={hiddenImg}
                  alt=""
                />
              </a>
              <div className="media-body ml-4">
                <a href={collection?.collectionBaseUrl} target="blank">
                  <h4 className="m-0">Free Mint</h4>
                </a>
                <div className="countdown-times">
                  <h6 className="my-2">Get your free CryptoCat</h6>
                </div>
              </div>
            </div>
            {/* Project Body */}
            <div className="card-body">
              <div className="item-progress">
                <div className="progress mt-4 mt-md-5">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${data.alreadyClaimed ? 100 : 0}%`,
                    }}
                    aria-valuenow={(data.mintedSupply / data.maxSupply) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {data.alreadyClaimed ? "Claimled" : ""}
                  </div>
                </div>
                <div className="progress-sale d-flex justify-content-between mt-3">
                  <span>1 CAT Free for whithelisted accounts</span>
                </div>
              </div>
            </div>
            {/* Project Footer */}
            <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
              <button
                className="btn btn-bordered-white btn-smaller"
                onClick={whiteListMint}
              >
                Mint
              </button>
            </div>

            {/* Blockchain Icon */}
            <div className="blockchain-icon">
              <img src={polygonLogo} alt="" />
            </div>
          </div>
        )}

        <div className="card project-card ml-3">
          <div className="media">
            <a href={collection?.collectionBaseUrl} target="blank">
              <img
                className="card-img-top avatar-max-lg"
                src={hiddenImg}
                alt=""
              />
            </a>
            <div className="media-body ml-4">
              <a href={collection?.collectionBaseUrl} target="blank">
                <h4 className="m-0">Mint</h4>
              </a>
              <div className="countdown-times">
                <h6 className="my-2">Get your CryptoCat</h6>
              </div>
            </div>
          </div>
          {/* Project Body */}
          <div className="card-body">
            <div className="items">
              {/* Single Item */}
              <div className="single-item">
                <span>Total supply : </span>
                <span>{data.maxSupply}</span>
              </div>
              {/* Single Item */}
              <div className="single-item">
                <span>Total Minted : </span>
                <span>{data.mintedSupply}</span>
              </div>
            </div>
            <div className="item-progress">
              <div className="progress mt-4 mt-md-5">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(data.mintedSupply / data.maxSupply) * 100}%`,
                  }}
                  aria-valuenow={(data.mintedSupply / data.maxSupply) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {(data.mintedSupply / data.maxSupply) * 100}%
                </div>
              </div>
              <div className="progress-sale d-flex justify-content-between mt-3">
                <span>Price</span>
                <span>
                  {data.price && ethers.utils.formatEther(data.price)} ETH
                </span>
              </div>
            </div>
          </div>
          {/* Project Footer */}
          <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
            <button
              className="btn btn-bordered-white btn-smaller"
              onClick={mint}
            >
              Mint
            </button>
          </div>

          {/* Blockchain Icon */}
          <div className="blockchain-icon">
            <img src={polygonLogo} alt="" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Minting;
