import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Help from "../components/Help/Help";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";

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
