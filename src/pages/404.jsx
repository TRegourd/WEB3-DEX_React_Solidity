import React from "react";

import Header from "../activeComponents/Header/Header";
import Breadcrumb from "../activeComponents/Breadcrumb/Breadcrumb";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";

export default function NotFound() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Page Not Found" subpage="" page="Not Found" />
      <Footer />
      <ModalMenu />
    </div>
  );
}
