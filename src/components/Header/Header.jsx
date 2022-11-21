import React from "react";

function Header() {
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
                Projects <i className="icon-arrow-down" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/project-one" className="nav-link">
                    Project Style 1
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/project-two" className="nav-link">
                    Project Style 2
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/project-three" className="nav-link">
                    Project Style 3
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/project-four" className="nav-link">
                    Project Style 4
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/project-single" className="nav-link">
                    Project Single
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                Staking <i className="icon-arrow-down" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/staking-one" className="nav-link">
                    Staking Style 1
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/staking-two" className="nav-link">
                    Staking Style 2
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">
                Pages <i className="icon-arrow-down" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/farming" className="nav-link">
                    Farming
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/leaderboard" className="nav-link">
                    Leaderboard
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a href="#" className="nav-link">
                    Inner Pages <i className="icon-arrow-right" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="/apply" className="nav-link">
                        Apply for Project
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/wallet-connect" className="nav-link">
                        Wallet Connect
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/help-center" className="nav-link">
                        Help Center
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/contact" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a href="#" className="nav-link">
                    Auth Pages <i className="icon-arrow-right" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="/login" className="nav-link">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/register" className="nav-link">
                        Register
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/reset" className="nav-link">
                        Forgot Password
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="/tokenomics" className="nav-link">
                    Tokenomics
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/tier-system" className="nav-link">
                    Tier System
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a href="#" className="nav-link">
                    Community <i className="icon-arrow-right" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="/blog" className="nav-link">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/blog-single" className="nav-link">
                        Blog Single
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
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
          </ul>
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
          <ul className="navbar-nav action">
            <li className="nav-item ml-2">
              <a
                href="/wallet-connect"
                className="btn ml-lg-auto btn-bordered-white"
              >
                <i className="icon-wallet mr-md-2" />
                Wallet Connect
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
