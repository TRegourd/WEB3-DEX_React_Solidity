import React from "react";
import Header from "../activeComponents/Header/Header";
import Breadcrumb from "../activeComponents/Breadcrumb/Breadcrumb";
import Cta from "../activeComponents/Cta/Cta";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";
import SwappingPage from "../activeComponents/Swapping/SwappingPage";

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
