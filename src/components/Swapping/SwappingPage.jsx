import React, { useEffect } from "react";
import { useState } from "react";

const data = {
  heading: "Swap Tokens",
  balance: "256.50 BUSD",
  content: "",
  note: "",
  input_btn_1: "Approve",
  input_btn_2: "Withdraw",
};

export default function SwappingPage() {
  const [tokenFrom, setTokenFrom] = useState();
  const [tokenTo, setTokenTo] = useState();

  useEffect(() => {
    setTokenFrom({ symbol: "TKN1", liquidity: 10000 });
    setTokenTo({ symbol: "TKN2", liquidity: 100000 });
  }, []);

  function invertTokens() {
    const wasTokenTo = tokenTo;
    const wasTokenFrom = tokenFrom;
    setTokenFrom(wasTokenTo);
    setTokenTo(wasTokenFrom);
  }

  return (
    <section className="staking-area" style={{ alignItems: "center" }}>
      <div className="container">
        <div className="col-12 ">
          <div className="card no-hover staking-card single-staking">
            <h3 className="m-0">{data.heading}</h3>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input type="text" placeholder={`Balance : ${0.0}`} />
                    <a href="#">Max</a>
                  </div>
                  <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    {data.input_btn_1}
                  </a>
                </div>
                <div className="input-area d-flex flex-column flex-md-row">
                  <div className="input-text">
                    <input type="text" placeholder={`Balance : ${0.0}`} />
                    <a href="#">Max</a>
                  </div>
                  <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    {data.input_btn_2}
                  </a>
                </div>
              </div>
              <div
                className="staking-items mt-4 mt-md-0"
                style={{ textAlign: "center" }}
              >
                {/* Single Card */}
                <div className="">
                  <h3 className="m-0">{tokenFrom?.symbol}</h3>
                  <p>{tokenFrom?.liquidity} ETH</p>
                </div>
                <button
                  onClick={invertTokens}
                  className="btn icons icon-arrow-down text-effect"
                ></button>
                <div className="">
                  <h3 className="m-0">{tokenTo?.symbol}</h3>
                  <p>{tokenTo?.liquidity} ETH</p>
                </div>
              </div>
            </div>
            <span>{data.content}</span>
            <span className="mt-3">
              <strong>{data.note}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
