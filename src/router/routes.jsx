import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing all the themes
import Home from "../pages/home";
import ProjectOne from "../pages/project-one";
import ProjectTwo from "../pages/project-two";
import ProjectThree from "../pages/project-three";
import ProjectFour from "../pages/project-four";
import ProjectSingle from "../pages/project-single";
import StakingOne from "../pages/staking-one";
import StakingTwo from "../pages/staking-two";
import Farming from "../pages/farming";
import Leaderboard from "../pages/leaderboard";
import Apply from "../pages/apply";
import Wallet from "../pages/wallet-connect";
import HelpCenter from "../pages/help-center";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Register from "../pages/register";
import Reset from "../pages/reset";
import Tokenomics from "../pages/tokenomics";
import Tier from "../pages/tier-system";
import Blog from "../pages/blog";
import BlogSingle from "../pages/blog-single";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/project-one" element={<ProjectOne />} />
          <Route exact path="/project-two" element={<ProjectTwo />} />
          <Route exact path="/project-three" element={<ProjectThree />} />
          <Route exact path="/project-four" element={<ProjectFour />} />
          <Route exact path="/project-single" element={<ProjectSingle />} />
          <Route exact path="/staking-one" element={<StakingOne />} />
          <Route exact path="/staking-two" element={<StakingTwo />} />
          <Route exact path="/farming" element={<Farming />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route exact path="/apply" element={<Apply />} />
          <Route exact path="/wallet-connect" element={<Wallet />} />
          <Route exact path="/help-center" element={<HelpCenter />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/tokenomics" element={<Tokenomics />} />
          <Route exact path="/tier-system" element={<Tier />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog-single" element={<BlogSingle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
