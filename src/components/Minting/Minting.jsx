import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";
import whiteList from "../../data/whiteList.json";
import MerkleTree from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import { AuthContext } from "../../AuthProvider";
import artifacts from "../../artifacts";
import MintingCard from "./MintingCard";
import FreeMintingCard from "./FreeMintingCard";

function Minting({ collection }) {
  const { currentAccount } = useContext(AuthContext);

  const [data, setData] = useState({});
  const contractAddress = collection.NftsAddress;
  const contractArtifact = artifacts[collection?.NftsContract];

  let addressList = [];
  whiteList.map((entry) => {
    addressList.push(entry.address);
  });
  const isWhiteListed = whiteList.some(
    (entry) => entry.address === currentAccount
  );

  const leaves = addressList.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });

  useEffect(() => {
    fetchData();
  }, [useLocation()]);

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
        const price = await contract.tokenPrice();
        const mintedSupply = await contract.totalSupply();
        const maxSupply = await contract.maxSupply();

        const alreadyClaimed = await contract.claimedWhiteListNFTs(accounts[0]);

        const object = {
          price: String(price),
          mintedSupply: String(mintedSupply),
          maxSupply: String(maxSupply),
          alreadyClaimed: alreadyClaimed,
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

        toast.promise(transaction.wait(), {
          pending: "Minting in progress 🔗",
          success: "NFT Minted 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

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

        toast.promise(transaction.wait(), {
          pending: "Minting in progress 🔗",
          success: "NFT Minted 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

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
          <FreeMintingCard
            collection={collection}
            data={data}
            mint={whiteListMint}
          />
        )}
        <MintingCard collection={collection} data={data} mint={mint} />
      </div>
      <ToastContainer />
    </>
  );
}

export default Minting;
