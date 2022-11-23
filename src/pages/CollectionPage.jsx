import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import CollectionList from "../components/Project/CollectionList";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Minting from "../components/Minting/Minting";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";

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
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default CollectionPage;
