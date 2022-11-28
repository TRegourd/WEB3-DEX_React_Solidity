import React, { useContext } from "react";
import { ethers } from "ethers";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";
import Collections from "../../data/collections.json";

function Header() {
  const { currentAccount, setCurrentAccount } = useContext(AuthContext);

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setCurrentAccount(await signer.getAddress());
  }

  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar gameon-navbar navbar-expand"
      >
        <div className="container header">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src="/img/logo.png" alt="Brand Logo" />
          </a>
          <div className="ml-auto" />
          {/* Navbar Nav */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                Buy NFT <i className="icon-arrow-down" />
              </a>
              <ul className="dropdown-menu">
                {Collections &&
                  Collections.map((collection) => {
                    return (
                      <li key={collection.slug} className="nav-item">
                        <Link to={`/${collection.slug}`} className="nav-link">
                          {collection.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
            <li className="nav-item">
              <a href="/swapping" className="nav-link">
                Swap
              </a>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                Earn <i className="icon-arrow-down" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/project-one" className="nav-link">
                    Staking
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/farming" className="nav-link">
                    NFT Farming
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Navbar Icons */}
          {/* <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="icon-magnifier" />
              </a>
            </li>
          </ul> */}
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="icon-menu m-0" />
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          {!currentAccount && (
            <ul className="navbar-nav action" onClick={connectToMetamask}>
              <li className="nav-item ml-2">
                <div className="btn ml-lg-auto btn-bordered-white">
                  <i className="icon-wallet mr-md-2" />
                  Wallet Connect
                </div>
              </li>
            </ul>
          )}
          {currentAccount && (
            <ul className="navbar-nav action" onClick={connectToMetamask}>
              <li className="nav-item ml-2">
                <div className="btn ml-lg-auto btn-bordered-white">
                  <i className="icon-wallet mr-md-2" />
                  {currentAccount.slice(0, 10)} ...
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
