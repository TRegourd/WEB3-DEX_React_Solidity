import React from "react";

const data = {
  sub_heading: "Getting Started",
  heading: "How to interact with RidgeSwap",
  workData: [
    {
      id: 1,
      icon: "icons icon-drawer text-effect",
      title: "Setup Mumbai",
      content: "Setup Mumbai Polygon's testnet and get some faucet MATIC",
    },
    {
      id: 2,
      icon: "icons icon-wallet text-effect",
      title: "Connect Wallet",
      content:
        "Connect your Metamask wallet by clicking ont the top right button",
    },
    {
      id: 3,
      icon: "icons icon-fire text-effect",
      title: "Start Exploring",
      content:
        "You're ready to explore NFT collections, Stake and Swap your tokens",
    },
  ],
};

export default function HowTo() {
  return (
    <section className="work-area" id="howto">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end mb-4">
              <div className="intro-content">
                <span className="intro-text">{data.sub_heading}</span>
                <h3 className="mt-3 mb-0">{data.heading}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {data.workData.map((item, idx) => {
            return (
              <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                {/* Single Work */}
                <div className="single-work">
                  <i className={item.icon} />
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
