import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Farm from "../components/Farming/Farming";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Collections from "../data/collections.json";

export default function Farming() {
  const farmableCollections = Collections?.filter((collection) => {
    return collection?.farmable === true;
  });

  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Farming" subpage="Pages" page="Farming" />
      <Farm collections={farmableCollections} />
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}
