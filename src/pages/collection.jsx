import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import CollectionList from "../components/Collection/CollectionList";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";
import Minting from "../components/Minting/Minting";

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
