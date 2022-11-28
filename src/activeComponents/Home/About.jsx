import React from "react";

const data = {
  sub_heading: "About",
  heading: "What is RidgeSwap ?",
  excerpt:
    "RidgeSwap is a platform to demonstrate Web 3.0 features like NFT minting & staking, liquidity swapping and more...",
  contentData: [
    {
      id: 1,
      icon: "fa-brands fa-ethereum",
      featured: "",
      featuredLink: "",
      title: "Solidity Smart Contracts",
      content:
        "Interact with solidity written smart contracts, deployed on Polygon's EVM",
    },
    {
      id: 2,
      icon: "fa-brands fa-react",
      featured: "",
      featuredLink: "",
      title: "React Interface",
      content:
        "Single Page React Application using ethers.js for smart contract connection",
    },
    {
      id: 3,
      icon: "fa-brands fa-github",
      featured: "featured",
      featuredLink: "https://github.com/TRegourd/WEB3-DEX_React_Solidity",
      title: "Explore Code",
      content:
        "Explore project's github repository to learn more about the code behind RidgeSwap",
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
                      {!item?.featured && (
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
                      )}
                      {item?.featured && (
                        <div className="content-list d-flex align-items-center">
                          <a
                            href={item.featuredLink}
                            className="content-icon"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className={item.featured}>
                              <i className={item.icon} />
                            </span>
                          </a>
                          <div className="content-body ml-4">
                            <a
                              href={item.featuredLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <h3 className="m-0">{item.title}</h3>
                            </a>
                            <p className="mt-3">{item.content}</p>
                          </div>
                        </div>
                      )}
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
