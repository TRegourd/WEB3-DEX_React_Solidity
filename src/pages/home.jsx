import React from "react";

import Header from "../activeComponents/Header/Header";
import Hero from "../activeComponents/Home/Hero";
import About from "../activeComponents/Home/About";
import HowTo from "../activeComponents/Home/HowTo";
import Cta from "../activeComponents/Cta/Cta";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";

function Home() {
  return (
    <div className="main">
      <Header />
      <Hero />
      <About />
      <HowTo />
      <Cta />
      <Footer />
      <ModalMenu />
    </div>
  );
}

export default Home;
