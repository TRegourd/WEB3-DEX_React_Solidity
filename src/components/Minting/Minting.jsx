import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import hiddenImg from "../../assets/images/hidden.jpeg";
import polygonLogo from "../../assets/images/polygon-matic-logo.png";
import contractArtifact from "../../artifacts/contracts/myAwesomeNFT.sol/MyAwesomeNFT.json";

function Minting({ contractAddress }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

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
        const mintedSupply = await contract._tokenIds();
        const totalSupply = await contract.maxSupply();
        const object = {
          price: String(price),
          mintedSupply: String(mintedSupply),
          totalSupply: String(totalSupply),
        };

        setData(object);
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
        await transaction.wait();
        fetchData();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  return (
    <section className="minting-area">
      <div className="card project-card">
        <div className="media">
          <a href="/project-single">
            <img
              className="card-img-top avatar-max-lg"
              src={hiddenImg}
              alt=""
            />
          </a>
          <div className="media-body ml-4">
            <a href="/project-single">
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
              <span>{data.totalSupply}</span>
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
                  width: `${(data.mintedSupply / data.totalSupply) * 100}%`,
                }}
                aria-valuenow={(data.mintedSupply / data.totalSupply) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {(data.mintedSupply / data.totalSupply) * 100}%
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
          <button className="btn btn-bordered-white btn-smaller" onClick={mint}>
            Mint
          </button>
        </div>
        {/* Blockchain Icon */}
        <div className="blockchain-icon">
          <img src={polygonLogo} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Minting;
