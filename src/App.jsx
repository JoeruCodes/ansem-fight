import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import HomePage from "./pages/HomePage";
import ReferPage from "./ReferPage";
import "./App.css";
export const Context = React.createContext();
function App() {
  // Ensure the providers are set up correctly
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [loggerBuf, setLoggerBuf] = useState([]);
  const wallets = useMemo(() => [], [network]);
  const [wifAmount, setWifAmount] = useState(0);
  const [player, setPlayer] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [referredBy, setReferredBy] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoggerBuf((b) => {
        const newArray = [...b];
        newArray.shift();
        return newArray;
      });
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [loggerBuf]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Context.Provider
            value={{
              wifAmount,
              setWifAmount,
              player,
              setPlayer,
              loggerBuf,
              setLoggerBuf,
              leaderboard,
              setLeaderboard,
              referredBy,
              setReferredBy
            }}
          >

  <Routes>
    <Route path="/refer/:variable" element={<ReferPage />} />
    <Route path="/" element={<HomePage />} />
  </Routes>



            {/* <HomePage /> */}
          </Context.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
