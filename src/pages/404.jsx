import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";

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
