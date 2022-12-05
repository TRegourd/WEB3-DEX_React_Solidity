export default function FreeMintingCard({ collection, data, mint }) {
  return (
    <div className="card project-card">
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
            <h4 className="m-0">Free Mint</h4>
          </a>
          <div className="countdown-times">
            <h6 className="my-2">Get your free NFT</h6>
          </div>
        </div>
      </div>
      {/* Project Body */}
      <div className="card-body">
        <div className="item-progress">
          <div className="progress mt-4 mt-md-5">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${data.alreadyClaimed ? 100 : 0}%`,
              }}
              aria-valuenow={(data.mintedSupply / data.maxSupply) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {data.alreadyClaimed ? "Claimled" : ""}
            </div>
          </div>
          <div className="progress-sale d-flex justify-content-between mt-3">
            <span>1 NFT Free for whithelisted accounts</span>
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
