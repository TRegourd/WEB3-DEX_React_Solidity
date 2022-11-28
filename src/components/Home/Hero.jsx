import React from "react";

const data = {
  sub_heading: "Ridge Exchange",
  heading: "The Next Gen Decentralized Exchange",
  content: "Web 3.0 platform for NFT and DEFI",
};

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-9 text-center">
            {/* Hero Content */}
            <div className="hero-content">
              <div className="intro text-center mb-5">
                <span className="intro-text">{data.sub_heading}</span>
                <h1 className="mt-4">{data.heading}</h1>
                <p>{data.content}</p>
              </div>
              {/* Buttons */}
              <div className="button-group">
                <a
                  className="btn btn-bordered active smooth-anchor"
                  href="#about"
                >
                  <i className="icon-rocket mr-2" />
                  Learn More
                </a>
                {/* <a className="btn btn-bordered-white" href="/apply">
                  <i className="icon-note mr-2" />
                  Apply Now
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
