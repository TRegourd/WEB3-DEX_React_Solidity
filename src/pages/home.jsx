import React from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import HowTo from "../components/Home/HowTo";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";

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
