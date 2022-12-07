import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BlogSingle from "../components/Legals/Legals";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";

export default function LegalPage() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Credits & Mentions" subpage="" page="Credits" />
      <BlogSingle />
      <Footer />
      <ModalMenu />
    </div>
  );
}
