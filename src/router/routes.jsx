import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing all the themes
import Home from "../pages/home";

import CollectionPage from "../pages/CollectionPage";

import Farming from "../pages/farming";

import Collections from "../data/collections.json";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/farming" element={<Farming />} />
          {Collections &&
            Collections.map((collection) => {
              return (
                <Route
                  exact
                  key={collection.slug}
                  path={`/${collection.slug}`}
                  element={<CollectionPage collection={collection} />}
                />
              );
            })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
