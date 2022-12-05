import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import tokens from "../../data/dex.json";
import artifacts from "../../artifacts";

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
  const [approved, setApproved] = useState();
  const [valueFrom, setValueFrom] = useState(0);
  const [valueTo, setValueTo] = useState(0);

  const DEXcontractArtifact = artifacts["DEX"];
  const DEXContractAddress = "0x43f3aCa29f53CAdf8f12023417A3FbEAD6ec07D3";

  useEffect(() => {
    fetchTokenFromData("rCATS");
    fetchTokenToData("MATIC");
  }, []);

  async function fetchTokenFromData(symbol) {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const DEXContract = new ethers.Contract(
        DEXContractAddress,
        DEXcontractArtifact.abi,
        provider
      );

      const tokenContractArtifact = artifacts["RewardToken"];
      const tokenContractAddress = tokens?.find((token) => {
        return token.symbol === symbol;
      })?.address;

      const TokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenContractArtifact.abi,
        provider
      );

      try {
        const allowance = parseInt(
          await TokenContract.allowance(accounts[0], DEXContractAddress),
          16
        );
        const userBalance = await TokenContract.balanceOf(accounts[0]);

        setApproved(allowance === 0 ? false : true);
        setTokenFrom({
          symbol: symbol,
          balance: (
            parseInt(userBalance._hex, 16) /
            ethers.utils.parseUnits("1", "ether")
          ).toFixed(8),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function fetchTokenToData(symbol) {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const DEXContract = new ethers.Contract(
        DEXContractAddress,
        DEXcontractArtifact.abi,
        provider
      );

      if (symbol !== "MATIC") {
        const tokenContractArtifact = artifacts["RewardToken"];
        const tokenContractAddress = tokens?.find((token) => {
          return token.symbol === symbol;
        })?.address;

        const TokenContract = new ethers.Contract(
          tokenContractAddress,
          tokenContractArtifact.abi,
          provider
        );

        try {
          const allowance = parseInt(
            await TokenContract.allowance(accounts[0], DEXContractAddress),
            16
          );
          const userBalance = await TokenContract.balanceOf(accounts[0]);

          setApproved(allowance === 0 ? false : true);
          setTokenTo({
            symbol: symbol,
            balance: (
              parseInt(userBalance._hex, 16) /
              ethers.utils.parseUnits("1", "ether")
            ).toFixed(8),
          });
        } catch (err) {
          console.log(err.message);
        }
      }
      if (symbol === "MATIC") {
        try {
          const userBalance = await provider.getBalance(accounts[0]);

          setTokenTo({
            symbol: symbol,
            balance: (
              parseInt(userBalance._hex, 16) /
              ethers.utils.parseUnits("1", "ether")
            ).toFixed(8),
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  function handleFromChange(event) {
    setTokenFrom(fetchTokenFromData(event.target.value));
  }

  function handleToChange(event) {
    setTokenTo(fetchTokenToData(event.target.value));
  }

  function setMax() {
    setValueFrom(tokenFrom["balance"]);
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
                    <input
                      type="text"
                      placeholder={`Swap : ${valueFrom} ${tokenFrom?.symbol}`}
                    />
                  </div>
                  <button
                    onClick={setMax}
                    className="btn btn-bordered-white mt-2 mt-md-0 ml-md-3"
                  >
                    Max
                  </button>
                </div>
                <div className="input-area d-flex flex-column flex-md-row">
                  <div className="input-text">
                    <input
                      type="text"
                      placeholder={`Get : ${valueTo} ${tokenTo?.symbol}`}
                    />
                  </div>
                  {approved && (
                    <button className="btn input-btn mt-2 mt-md-0 ml-md-3">
                      Swap
                    </button>
                  )}
                  {!approved && (
                    <button className="btn input-btn mt-2 mt-md-0 ml-md-3">
                      Approve
                    </button>
                  )}
                </div>
              </div>
              <div
                className="staking-items mt-4 mt-md-0"
                style={{ textAlign: "center" }}
              >
                {/* Single Card */}
                <div className="">
                  <h4 className="m-0">
                    <select
                      onChange={handleFromChange}
                      name="tokenId"
                      id="tokenId-select"
                      style={{ fontWeight: "bold" }}
                    >
                      {tokens &&
                        tokens.map((token) => {
                          return (
                            <option key={token.id} value={token.symbol}>
                              {token.symbol}
                            </option>
                          );
                        })}
                    </select>
                  </h4>
                  <p>
                    {tokenFrom?.balance} {tokenFrom?.symbol}
                  </p>
                </div>
                <button className="btn icons icon-arrow-down text-effect"></button>
                <div className="">
                  <h4 className="m-0">
                    {" "}
                    <select
                      name="tokenId"
                      id="tokenId-select"
                      style={{ fontWeight: "bold" }}
                      onChange={handleToChange}
                    >
                      <option value="MATIC">MATIC</option>
                      {tokens &&
                        tokens.map((token) => {
                          return (
                            <option key={token.id} value={token.symbol}>
                              {token.symbol}
                            </option>
                          );
                        })}
                    </select>
                  </h4>
                  <p>
                    {tokenTo?.balance} {tokenTo?.symbol}
                  </p>
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
