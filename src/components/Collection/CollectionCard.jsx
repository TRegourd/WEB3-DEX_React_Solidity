import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import polygonLogo from "../../assets/images/polygon-matic-logo.png";
export default function CollectionCard({ item }) {
  const [itemData, setItemData] = useState();

  async function getData(item) {
    setItemData(await axios.get(item));
  }

  useEffect(() => {
    getData(item);
  }, [item]);

  console.log(itemData);
  if (itemData) {
    return (
      <div className="col-12 col-md-6 col-lg-4 item explore-item">
        <div className="card project-card">
          <div className="media">
            <a href="/project-single">
              <img
                className="card-img-top avatar-max-lg"
                src={itemData.data.image}
                alt=""
              />
            </a>
            <div className="media-body ml-4">
              <a href="/project-single">
                <h4 className="m-0">{itemData.data.collection.family}</h4>
              </a>
              <div className="countdown-times">
                <h6 className="my-2">{itemData.data.collection.name}</h6>
              </div>
            </div>
          </div>
          Project Body
          <div className="card-body">
            <div className="items">
              {/* Single Item */}
              <div className="single-item">
                <span>{itemData.data.description}</span>
              </div>
            </div>
          </div>
          {/* Project Footer */}
          <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
            <a
              className="btn btn-bordered-white btn-smaller"
              href="/project-single"
            >
              View on Opensea
            </a>
          </div>
          {/* Blockchain Icon */}
          <div className="blockchain-icon">
            <img src={polygonLogo} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
