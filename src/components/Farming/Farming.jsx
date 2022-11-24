import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmingCard from "./FamringCard";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/gameon-json-1/farming";
export default function Farming({ collections }) {
  console.log(collections);
  const [farmingData, setFarmingData] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setFarmingData(res.data.farmingData);
        // console.log(data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="staking-area">
      <div id="gameon-accordion" className="container accordion">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            {/* Single Accordion Item */}
            {collections &&
              collections.map((collection, idx) => {
                return <FarmingCard collection={collection} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
