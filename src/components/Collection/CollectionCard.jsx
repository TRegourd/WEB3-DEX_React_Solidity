export default function CollectionCard({ item }) {
  if (item) {
    return (
      <div className="card project-card">
        <div className="media">
          <a target="blank" href={item.link}>
            <img
              className="card-img-top avatar-max-lg"
              src={item.image}
              alt=""
            />
          </a>
          <div className="media-body ml-4">
            <a target="blank" href={item.link}>
              <h4 className="m-0">{item.symbol}</h4>
            </a>
            <div className="countdown-times">
              <h6 className="my-2">{item.description}</h6>
            </div>
          </div>
        </div>

        {/* Project Footer */}
        <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
          <a target="blank" href={item.link}>
            <button className="btn btn-bordered-white btn-smaller">
              View on OpenSea
            </button>
          </a>
        </div>
        {/* Blockchain Icon */}
        <div className="blockchain-icon">
          <img src={item.blockchainLogo} alt="" />
        </div>
      </div>
    );
  }
}
