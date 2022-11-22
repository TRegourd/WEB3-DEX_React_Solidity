import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import contractArtifact from "../../artifacts/contracts/myAwesomeNFT.sol/MyAwesomeNFT.json";

const contractAddress = "0xDF3BB2823642C5bBEEC0061d15FB8815bE23de0B";

function Minting() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");

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
        setError(err.message);
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
    <section className="staking-area">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="card no-hover staking-card single-staking">
              <h3 className="m-0">Get Yours</h3>
              <span className="balance">
                Price : {data.price && ethers.utils.formatEther(data.price)} ETH
              </span>
              <div className="tab-content mt-md-3" id="myTabContent"></div>
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input type="text" placeholder={0.0} />
                  </div>
                  <button
                    onClick={mint}
                    className="btn input-btn mt-2 mt-md-0 ml-md-3"
                  >
                    Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="staking-items mt-4 mt-md-0">
              <div className="card no-hover staking-card mb-5">
                <h3 className="m-0">{data.mintedSupply}</h3>
                <p>NFT Minted</p>
              </div>
              <div className="card no-hover staking-card">
                <h3 className="m-0">{data.totalSupply}</h3>
                <p>Total NFT in collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Minting;
