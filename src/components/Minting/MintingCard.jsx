import { ethers } from "ethers";

export default function MintingCard({ collection, data, mint }) {
  return (
    <div className="card project-card ml-3">
      <div className="media">
        <a href={collection?.collectionBaseUrl} target="blank">
          <img
            className="card-img-top avatar-max-lg"
            src={collection.collectionLogo}
            alt=""
          />
        </a>
        <div className="media-body ml-4">
          <a href={collection?.collectionBaseUrl} target="blank">
            <h4 className="m-0">Mint</h4>
          </a>
          <div className="countdown-times">
            <h6 className="my-2">Get your NFT</h6>
          </div>
        </div>
      </div>
      {/* Project Body */}
      <div className="card-body">
        <div className="items">
          {/* Single Item */}
          <div className="single-item">
            <span>Total supply : </span>
            <span>{data.maxSupply}</span>
          </div>
          {/* Single Item */}
          <div className="single-item">
            <span>Total Minted : </span>
            <span>{data.mintedSupply}</span>
          </div>
        </div>
        <div className="item-progress">
          <div className="progress mt-4 mt-md-5">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${(data.mintedSupply / data.maxSupply) * 100}%`,
              }}
              aria-valuenow={(data.mintedSupply / data.maxSupply) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {((data.mintedSupply / data.maxSupply) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="progress-sale d-flex justify-content-between mt-3">
            <span>Price</span>
            <span>
              {data.price && ethers.utils.formatEther(data.price)} ETH
            </span>
          </div>
        </div>
      </div>
      {/* Project Footer */}
      <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
        <button className="btn btn-bordered-white btn-smaller" onClick={mint}>
          Mint
        </button>
      </div>

      {/* Blockchain Icon */}
      <div className="blockchain-icon">
        <img src={collection.blockchainLogo} alt="" />
      </div>
    </div>
  );
}
