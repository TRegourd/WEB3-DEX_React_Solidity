import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();

  const getCurrentUser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    if (provider.getSigner()) {
      const signer = provider.getSigner();
      setCurrentAccount(await signer.getAddress());
    } else {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setCurrentAccount(await signer.getAddress());
    }
  };

  getCurrentUser();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const value = { currentAccount, setCurrentAccount };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
