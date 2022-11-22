import React, { useContext, useEffect, useState } from "react";
import Minting from "../Minting/Minting";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

import CollectionCard from "../Collection/CollectionCard";

function Collection() {
  const contractAddress = "0xDF3BB2823642C5bBEEC0061d15FB8815bE23de0B";
  const { currentAccount } = useContext(AuthContext);
  const [initData, setInitData] = useState({});
  const [collectionData, setCollectionData] = useState([]);

  function fetchCollectionData() {
    if (currentAccount) {
      const baseURL = process.env.REACT_APP_ALCHEMY_API_URL;
      const url = `${baseURL}/getNFTs/?owner=${currentAccount}`;

      const config = {
        method: "get",
        url: url,
      };
      console.log("...pending");

      axios(config)
        .then((response) => {
          setCollectionData(
            response["data"].ownedNfts.filter((entry) => {
              return (
                entry.contract.address.toLowerCase() ===
                contractAddress.toLowerCase()
              );
            })
          );
        })
        .catch((error) => console.log("error", error));
    }
  }

  useEffect(() => {
    fetchCollectionData();
  }, [currentAccount]);

  return (
    <section className="project-area explore-area">
      <pre>{JSON.stringify(collectionData, null, 2)}</pre>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <div className="intro-content">
                <span className="intro-text">Collection</span>
                <h3 className="mt-3 mb-0">Découvrez les Crypto Cats</h3>
                <p>{initData.content}</p>
              </div>
            </div>
          </div>
        </div>
        <Minting contractAddress={contractAddress} />
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div className="intro text-center">
              <div className="intro-content">
                <h3 className="mt-3 mb-0">Your Collection</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row explore-items items inner">
          {collectionData.map((item, idx) => {
            if (item.tokenUri)
              return (
                <CollectionCard
                  item={item.tokenUri.gateway}
                  key={`pd_${idx}`}
                />
              );
          })}
        </div>
        <div className="row explore-items items inner"></div>
      </div>
    </section>
  );
}

export default Collection;
