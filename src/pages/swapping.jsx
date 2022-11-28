import React from "react";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";
import SwappingPage from "../components/Swapping/SwappingPage";

export default function Swapping() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Swapping" subpage="" page="Swapping" />
      <SwappingPage />
      <Cta />
      <Footer />
      <ModalMenu />
    </div>
  );
}
