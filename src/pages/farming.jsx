import React from "react";

import Header from "../activeComponents/Header/Header";
import Breadcrumb from "../activeComponents/Breadcrumb/Breadcrumb";
import Farm from "../activeComponents/Farming/Farming";
import Cta from "../activeComponents/Cta/Cta";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";
import Collections from "../data/collections.json";

export default function Farming() {
  const farmableCollections = Collections?.filter((collection) => {
    return collection?.farmable === true;
  });

  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Farming" subpage="" page="Farming" />
      <Farm collections={farmableCollections} />
      <Cta />
      <Footer />
      <ModalMenu />
    </div>
  );
}
