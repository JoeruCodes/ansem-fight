import React from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletMultiButton1 } from "./WalletMultiButton1";

export default function WalletSection({ wallet }) {
  return (
    <>
      <WalletMultiButton1 />
    </>
  );
}
