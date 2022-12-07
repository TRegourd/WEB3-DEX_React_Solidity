import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import tokens from "../../data/dex.json";
import artifacts from "../../artifacts";
import { toast, ToastContainer } from "react-toastify";

export default function SwappingPage() {
  const [tokenFrom, setTokenFrom] = useState();
  const [tokenTo, setTokenTo] = useState();
  const [approved, setApproved] = useState();
  const [valueFrom, setValueFrom] = useState(0);
  const [valueTo, setValueTo] = useState(0);

  const DEXcontractArtifact = artifacts["DEX"];
  const DEXContractAddress = "0x033Cd45B18808B08E98463F66889C4b1bF75B358";

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

      const oracleContractArtifact = artifacts["MyOracle"];
      const oracleContractAddress = await DEXContract.oracles(symbol);

      const OracleContract = new ethers.Contract(
        oracleContractAddress,
        oracleContractArtifact.abi,
        provider
      );

      try {
        const allowance = parseInt(
          await TokenContract.allowance(accounts[0], DEXContractAddress),
          16
        );
        const userBalance = await TokenContract.balanceOf(accounts[0]);
        const tokenPrice = await OracleContract.getPrice();

        setApproved(allowance === 0 ? false : true);
        setTokenFrom({
          symbol: symbol,
          balance: parseInt(userBalance._hex, 16),
          price: parseInt(tokenPrice?._hex, 16),
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

        const oracleContractArtifact = artifacts["MyOracle"];
        const oracleContractAddress = await DEXContract.oracles(symbol);

        const OracleContract = new ethers.Contract(
          oracleContractAddress,
          oracleContractArtifact.abi,
          provider
        );

        console.log(oracleContractAddress);

        try {
          const allowance = parseInt(
            await TokenContract.allowance(accounts[0], DEXContractAddress),
            16
          );
          const userBalance = await TokenContract.balanceOf(accounts[0]);

          const tokenPrice = await OracleContract.getPrice();

          setApproved(allowance === 0 ? false : true);
          setTokenTo({
            symbol: symbol,
            balance: parseInt(userBalance._hex, 16),
            price: parseInt(tokenPrice?._hex, 16),
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
            balance: parseInt(userBalance._hex, 16),
            price: parseInt(ethers.utils.parseUnits("1", "ether")._hex, 16),
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  async function approve() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenContractArtifact = artifacts["RewardToken"];
      const tokenContractAddress = tokens?.find((token) => {
        return token.symbol === tokenFrom?.symbol;
      })?.address;

      const TokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenContractArtifact.abi,
        signer
      );

      try {
        const transaction = await TokenContract.approve(
          DEXContractAddress,
          ethers.utils.parseEther("1.0")
        );

        toast.promise(transaction.wait(), {
          pending: "Approving in progress 🔗",
          success: "Approved 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();

        const allowance = parseInt(
          await TokenContract.allowance(accounts[0], DEXContractAddress),
          16
        );

        setApproved(allowance === 0 ? false : true);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function change() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const DEXContract = new ethers.Contract(
        DEXContractAddress,
        DEXcontractArtifact.abi,
        signer
      );

      try {
        const transaction = await DEXContract.change(
          tokenFrom?.symbol,
          ethers.utils.parseUnits(String(valueFrom), "wei")
        );
        toast.promise(transaction.wait(), {
          pending: "Swapping 🔗",
          success: "Swapping done 👌",
          error: "Transaction rejected 🤯",
        });
        await transaction.wait();
        fetchTokenFromData(tokenFrom?.symbol);
        fetchTokenToData(tokenTo?.symbol);
      } catch (err) {
        console.log(err);
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
    const max = tokenFrom?.balance;
    setValueFrom(max);
    const valueTo = (tokenFrom?.price / tokenTo?.price) * max;
    setValueTo(valueTo);
  }

  function handleFromValueChange(event) {
    console.log(event.target.value);
    setValueFrom(event.target.value);
    const valueTo = tokenFrom?.price * event.target.value;
    setValueTo(valueTo);
  }

  console.log({ valueFrom }, { valueTo }, { tokenFrom }, { tokenTo });

  return (
    <section className="staking-area" style={{ alignItems: "center" }}>
      <div className="container">
        <div className="col-12 ">
          <div className="card no-hover staking-card single-staking">
            <h3 className="m-0">Swap Tokens</h3>

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
                      placeholder={`Swap ${tokenFrom?.symbol}`}
                      onChange={handleFromValueChange}
                      value={
                        valueFrom
                          ? valueFrom / ethers.utils.parseUnits("1", "ether")
                          : ""
                      }
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
                      disabled="disabled"
                      type="text"
                      placeholder={`Get ${tokenTo?.symbol}`}
                      value={
                        valueTo
                          ? valueTo / ethers.utils.parseUnits("1", "ether")
                          : ""
                      }
                    />
                  </div>
                  {approved && (
                    <button
                      onClick={change}
                      className="btn input-btn mt-2 mt-md-0 ml-md-3"
                    >
                      Swap
                    </button>
                  )}
                  {!approved && (
                    <button
                      onClick={approve}
                      className="btn input-btn mt-2 mt-md-0 ml-md-3"
                    >
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
                    {tokenFrom?.balance / ethers.utils.parseUnits("1", "ether")}{" "}
                    {tokenFrom?.symbol}
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
                    {tokenTo?.balance / ethers.utils.parseUnits("1", "ether")}{" "}
                    {tokenTo?.symbol}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
