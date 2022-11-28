import React, { useEffect, useState } from "react";

const data = {
  sub_heading: "About",
  heading: "What is Ridge DEX ?",
  excerpt:
    "Ridge DEX is a platform to demonstrate Web 3.0 features like NFT minting & staking, liquidity swapping and more...",
  contentData: [
    {
      id: 1,
      icon: "fa-brands fa-discord",
      featured: "",
      title: "Submit KYC",
      content:
        "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
    {
      id: 2,
      icon: "fa-brands fa-hotjar",
      featured: "featured",
      title: "Verify Wallet",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
    },
    {
      id: 3,
      icon: "fa-solid fa-rocket",
      featured: "",
      title: "Start Staking",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page.",
    },
  ],
};

export default function About() {
  return (
    <section className="content-area " id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="content intro">
              <span className="intro-text">{data.sub_heading}</span>
              <h2>{data.heading}</h2>
              <p>{data.excerpt}</p>
              <ul className="list-unstyled items mt-5">
                {data.contentData.map((item, idx) => {
                  return (
                    <li key={`cd_${idx}`} className="item">
                      {/* Content List */}
                      <div className="content-list d-flex align-items-center">
                        <div className="content-icon">
                          <span className={item.featured}>
                            <i className={item.icon} />
                          </span>
                        </div>
                        <div className="content-body ml-4">
                          <h3 className="m-0">{item.title}</h3>
                          <p className="mt-3">{item.content}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Blockchain Animation */}
            <div className="wrapper-animation d-none d-md-block">
              <div className="blockchain-wrapper">
                <div className="pyramid">
                  <div className="square">
                    <div className="triangle" />
                    <div className="triangle" />
                    <div className="triangle" />
                    <div className="triangle" />
                  </div>
                </div>
                <div className="pyramid inverse">
                  <div className="square">
                    <div className="triangle" />
                    <div className="triangle" />
                    <div className="triangle" />
                    <div className="triangle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
