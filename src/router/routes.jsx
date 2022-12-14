import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing all the themes
import Home from "../pages/home";

import CollectionPage from "../pages/collection";
import Farming from "../pages/farming";
import Collections from "../data/collections.json";
import Swapping from "../pages/swapping";
import NotFound from "../pages/404";
import HelpPage from "../pages/helpPage";
import LegalPage from "../pages/legals";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farming" element={<Farming />} />
          <Route path="/swapping" element={<Swapping />} />
          {Collections &&
            Collections.map((collection) => {
              return (
                <Route
                  key={collection.slug}
                  path={`/${collection.slug}`}
                  element={<CollectionPage collection={collection} />}
                />
              );
            })}
          {/* <Route path="/help" element={<HelpPage />} /> */}
          <Route path="/legals" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
