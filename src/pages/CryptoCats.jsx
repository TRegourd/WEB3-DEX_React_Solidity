import React, { Component } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Collection from "../components/Project/Collection";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Minting from "../components/Minting/Minting";

function CryptoCats() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb
        title="Crypto Cats"
        subpage="Collections"
        page="Crypto Cats"
      />

      <Collection />
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default CryptoCats;
