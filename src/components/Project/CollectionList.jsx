import React, { useEffect, useState } from "react";

import axios from "axios";
import CollectionCard from "../Collection/CollectionCard";
import { ethers } from "ethers";
import { useLocation } from "react-router";
import artifacts from "../../artifacts";

function Collection({ collection }) {
  const contractAddress = collection.NftsAddress;
  const contractArtifact = artifacts[collection?.NftsContract];

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [useLocation()]);

  async function handleClick() {
    await fetchData();
  }

  async function fetchData() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
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

        setData(items);
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

    const tokenUri = await contract.tokenURI(item._hex);
    const HttpTokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const meta = await axios.get(HttpTokenUri);
    const HttpTokenImage = meta.data.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    const tokenData = {
      ...meta.data,
      link: link,
      image: HttpTokenImage,
      blockchainLogo: blockchainLogo,
    };
    return tokenData;
  }

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div className="intro text-center">
              <div className="intro-content">
                <h3 className="mt-5 mb-0">Your Collection</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div className="intro text-center">
              <div className="intro-content">
                <button
                  className="btn btn-bordered btn-smaller"
                  onClick={async () => {
                    await handleClick();
                  }}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row explore-items items inner collection">
          {data &&
            data.map((item, idx) => {
              return (
                <CollectionCard
                  className="col-12 col-md-6 col-lg-4"
                  item={item}
                  key={`pd_${idx}`}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Collection;
