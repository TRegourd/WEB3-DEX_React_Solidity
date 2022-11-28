import React from "react";

import Header from "../activeComponents/Header/Header";
import Breadcrumb from "../activeComponents/Breadcrumb/Breadcrumb";
import CollectionList from "../activeComponents/Collection/CollectionList";
import Cta from "../activeComponents/Cta/Cta";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";
import Minting from "../activeComponents/Minting/Minting";

function CollectionPage({ collection }) {
  return (
    <div className="main">
      <Header />
      <Breadcrumb
        title={collection.name}
        subpage="Collections"
        page={collection.name}
      />
      <section>
        <Minting collection={collection} />
        <CollectionList collection={collection} />
      </section>
      <Cta />
      <Footer />
      <ModalMenu />
    </div>
  );
}

export default CollectionPage;
