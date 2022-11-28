import React from "react";

import Header from "../activeComponents/Header/Header";
import Breadcrumb from "../activeComponents/Breadcrumb/Breadcrumb";
import Help from "../activeComponents/Help/Help";
import Faq from "../activeComponents/Faq/Faq";
import Footer from "../activeComponents/Footer/Footer";
import ModalMenu from "../activeComponents/Modal/ModalMenu";

export default function HelpPage() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Help Center" page="Help Center" />
      <Help />
      <Faq />
      <Footer />
      <ModalMenu />
    </div>
  );
}
