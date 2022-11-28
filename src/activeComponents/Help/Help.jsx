import React, { Component } from "react";
import axios from "axios";

const data = {
  sub_heading: "Help Center",
  heading: "How can we help you?",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  helpData: [
    {
      id: 1,
      icon: "icon icon-plane text-effect",
      title: "Getting Started",
      content:
        "Learn how to create an account, set up your wallet, and what you can do on gameon",
    },
    {
      id: 2,
      icon: "icon icon-note text-effect",
      title: "Creating",
      content:
        "Learn how to create your very first NFT and how to create your NFT collections so you can begin selling and sharing",
    },
    {
      id: 3,
      icon: "icon icon-handbag text-effect",
      title: "Buying",
      content:
        "Learn how to purchase your first NFT and understand gas fees and what's gas free on gameon",
    },
    {
      id: 4,
      icon: "icon icon-chart text-effect",
      title: "Selling",
      content:
        "Learn how list your NFTs for sale and understand the different ways to list your NFTs",
    },
    {
      id: 5,
      icon: "icon icon-link text-effect",
      title: "Partners",
      content: "Learn how you can partner with us to showcase your NFT drops",
    },
    {
      id: 6,
      icon: "icon icon-flag text-effect",
      title: "Developers",
      content:
        "Learn how you can develop with gameon & sell them on Marketplace",
    },
  ],
};

export default function Help() {
  return (
    <section className="help-center-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <div className="intro-content">
                <span className="intro-text">{data.sub_heading}</span>
                <h3 className="mt-3 mb-0">{data.heading}</h3>
                <p>{data.content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center items">
          {data.helpData.map((item, idx) => {
            return (
              <div key={`hcd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                {/* Help Card */}
                <div className="card help-card">
                  <a className="d-block text-center" href="/contact">
                    <i className={item.icon} />
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
