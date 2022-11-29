import React from "react";

const data = {
  img: "/img/logo.png",
  copyright: "©2022 Ridge DEX, All Rights Reserved By",
  owner: "Ridge Coding",
  ownerLink: "www.ridgecoding.com",
  socialData: [
    {
      id: 1,
      link: "https://github.com/TRegourd",
      icon: "icon-social-linkedin",
    },
    {
      id: 2,
      link: "https://github.com/TRegourd",
      icon: "icon-social-github",
    },
  ],
  widgetData: [
    {
      id: 1,
      text: "Features",
      link: "/blog",
    },
    {
      id: 2,
      text: "Roadmap",
      link: "/blog",
    },
    {
      id: 3,
      text: "How It Works",
      link: "#about",
    },
    {
      id: 4,
      text: "Blog",
      link: "/blog",
    },
    {
      id: 5,
      text: "Terms & Credits",
      link: "/legals",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            {/* Footer Items */}
            <div className="footer-items">
              {/* Logo */}
              <a className="navbar-brand" href="/">
                <img src={data.img} alt="" />
              </a>
              {/* Social Icons */}
              <div className="social-icons d-flex justify-content-center my-4">
                {data.socialData.map((item, idx) => {
                  return (
                    <a
                      key={`fsd_${idx}`}
                      className="facebook"
                      href={item.link}
                      target="_blank"
                    >
                      <i className={item.icon} />
                      <i className={item.icon} />
                    </a>
                  );
                })}
              </div>
              <ul className="list-inline">
                {data.widgetData.map((item, idx) => {
                  return (
                    <li key={`fwd_${idx}`} className="list-inline-item">
                      <a href={item.link}>{item.text}</a>
                    </li>
                  );
                })}
              </ul>
              {/* Copyright Area */}
              <div className="copyright-area py-4">
                {data.copyright}{" "}
                <a href={data.ownerLink} target="_blank">
                  {data.owner}
                </a>
              </div>
            </div>
            {/* Scroll To Top */}
            <div id="scroll-to-top" className="scroll-to-top">
              <a href="#header" className="smooth-anchor">
                <i className="fa-solid fa-arrow-up" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
