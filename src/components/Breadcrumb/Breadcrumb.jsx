import React from "react";

function Breadcrumb({ title, subpage, page }) {
  return (
    <section className="breadcrumb-area overlay-dark d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Breamcrumb Content */}
            <div className="breadcrumb-content text-center">
              <h2 className="m-0">{title}</h2>
              <ol className="breadcrumb d-flex justify-content-center">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{subpage}</a>
                </li>
                <li className="breadcrumb-item active">{page}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;
