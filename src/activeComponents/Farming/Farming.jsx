import React from "react";

import FarmingCard from "./FamringCard";

export default function Farming({ collections }) {
  return (
    <section className="staking-area">
      <div id="gameon-accordion" className="container accordion">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            {/* Single Accordion Item */}
            {collections &&
              collections.map((collection, idx) => {
                return <FarmingCard key={idx} collection={collection} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
