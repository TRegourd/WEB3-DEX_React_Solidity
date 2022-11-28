import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Staking from "../components/Staking/StakingOne";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";

export default function NotFound() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Page Not Found" subpage="" page="Not Found" />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}
