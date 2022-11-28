import React from "react";

const data = {
  img: "/img/cta_thumb.png",
  title: "How It Works",
  content: "Setup your wallet to interact with Ridge DEX",
  btn: "Learn More",
  btnIcon: "icon-rocket mr-2",
};

export default function Cta() {
  return (
    <section className="cta-area p-0">
      <div className="container">
        <div className="row">
          <div className="col-12 card">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-5 text-center">
                <img src={data.img} alt="" />
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <h2 className="m-0">{data.title}</h2>
                <p>{data.content}</p>
                <a className="btn btn-bordered active d-inline-block" href="/">
                  <i className={data.btnIcon} />
                  {data.btn}
                </a>
              </div>
            </div>
            <a className="cta-link" href="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
