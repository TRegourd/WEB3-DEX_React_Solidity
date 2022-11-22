import React, { useContext, useEffect, useState } from "react";
import Minting from "../Minting/Minting";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import polygonLogo from "../../assets/images/polygon-matic-logo.png";

const data = [
  {
    id: "1",
    img: "/img/thumb_1.png",
    group: '["ongoing","ended"]',
    blockchain: "/img/ethereum.png",
    title: "Metaverse 3D",
    reg_date: "2022-12-30",
    raise: "100k",
    val: "2.8M",
    allocation: "$0",
    progress: "25%",
    mecha: "0/100,069 MECHA",
    busd: "0 BUSD",
  },
  {
    id: "2",
    img: "/img/thumb_2.png",
    group: '["upcoming","ended"]',
    blockchain: "/img/binance.png",
    title: "Pixel Pix",
    reg_date: "2022-11-25",
    raise: "85k",
    val: "1.9M",
    allocation: "$0",
    progress: "8%",
    mecha: "0/94,752 MECHA",
    busd: "0 BUSD",
  },
  {
    id: "3",
    img: "/img/thumb_3.png",
    group: '["ongoing"]',
    blockchain: "/img/ethereum-gold.png",
    title: "Cyber City",
    reg_date: "2022-11-18",
    raise: "69k",
    val: "3.2M",
    allocation: "$0",
    progress: "12%",
    mecha: "0/87,074 MECHA",
    busd: "0 BUSD",
  },
  {
    id: "4",
    img: "/img/thumb_4.png",
    group: '["ended","ongoing"]',
    blockchain: "/img/solana.png",
    title: "Real Hunter",
    reg_date: "2022-12-28",
    raise: "90k",
    val: "2.6M",
    allocation: "$0",
    progress: "27%",
    mecha: "0/532,399 MECHA",
    busd: "0 BUSD",
  },
  {
    id: "5",
    img: "/img/thumb_5.png",
    group: '["ended","upcoming"]',
    blockchain: "/img/ethereum-gold.png",
    title: "BitHotel",
    reg_date: "2022-10-30",
    raise: "120k",
    val: "4.8M",
    allocation: "$0",
    progress: "42%",
    mecha: "0/298,064 MECHA",
    busd: "0 BUSD",
  },
  {
    id: "6",
    img: "/img/thumb_6.png",
    group: '["upcoming","ended"]',
    blockchain: "/img/ethereum.png",
    title: "CryptoPunk",
    reg_date: "2022-11-30",
    raise: "89k",
    val: "4.6M",
    allocation: "$0",
    progress: "64%",
    mecha: "0/396,074 MECHA",
    busd: "0 BUSD",
  },
];

const socialData = [
  {
    id: "1",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "2",
    link: "telegram",
    icon: "fab fa-telegram",
  },
  {
    id: "3",
    link: "globe",
    icon: "fas fa-globe",
  },
  {
    id: "4",
    link: "discord",
    icon: "fab fa-discord",
  },
];

function Collection() {
  const contractAddress = "0xDF3BB2823642C5bBEEC0061d15FB8815bE23de0B";
  const { currentAccount } = useContext(AuthContext);
  const [initData, setInitData] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [userCollection, setUserCollection] = useState([]);

  // Alchemy URL
  async function fetchcollectionData() {
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

  async function getNFTs(collection) {
    let items = [];
    collection.map((item) => {
      axios.get(item.tokenUri.gateway).then((response) => {
        items.push(response.data);
      });
    });
    setUserCollection(items);
    console.log(items);
  }

  useEffect(() => {
    fetchcollectionData();
  }, [currentAccount]);

  useEffect(() => {
    collectionData && getNFTs(collectionData);
  }, [collectionData]);

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
          {userCollection &&
            userCollection.map((item, idx) => {
              console.log(item);
              return (
                <div
                  key={`pd_${idx}`}
                  className="col-12 col-md-6 col-lg-4 item explore-item"
                >
                  <div className="card project-card">
                    <div className="media">
                      <a href="/project-single">
                        <img
                          className="card-img-top avatar-max-lg"
                          src={item.image}
                          alt=""
                        />
                      </a>
                      <div className="media-body ml-4">
                        <a href="/project-single">
                          <h4 className="m-0">{item.collection.family}</h4>
                        </a>
                        <div className="countdown-times">
                          <h6 className="my-2">{item.collection.name}</h6>
                        </div>
                      </div>
                    </div>
                    Project Body
                    <div className="card-body">
                      <div className="items">
                        {/* Single Item */}
                        <div className="single-item">
                          <span>{item.description}</span>
                        </div>
                      </div>
                    </div>
                    {/* Project Footer */}
                    <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
                      <a
                        className="btn btn-bordered-white btn-smaller"
                        href="/project-single"
                      >
                        View on Opensea
                      </a>
                    </div>
                    {/* Blockchain Icon */}
                    <div className="blockchain-icon">
                      <img src={polygonLogo} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Collection;
