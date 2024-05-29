import { useContext } from "react";
import React, { useEffect, useRef } from "react";
import { sounds } from "./gameConfig";
import { Howl } from "howler";

import "./Homepage.css";
import { Context } from "../App";
import "@solana/wallet-adapter-react-ui/styles.css";
import Error from "./Error";
import GameCover from "./GameCover";

export default function GameImage() {
  const containerRef = useRef(null);

  const {
    loggerBuf,
  } = useContext(Context);

  const soundRef = useRef({
    background: new Howl({ src: [sounds.background], loop: true, volume: 0.1 }),
  });

  useEffect(() => {
    try {
      soundRef.current.background.play();
    } catch (error) {
      console.error("Background music failed to play:", error);
    }
    return () => {
      soundRef.current.background.stop();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="image-container relative overflow-hidden"
      >
        <GameCover />
      </div>
      
      <div className="fixed z-[1000] bottom-0 left-0 space-y-2">
        {loggerBuf &&
          loggerBuf.map((l, i) => {
            return (
              <Error
                key={i}
                err={typeof l.error === "string" ? l.error : l.error.message}
                color={l.color}
              />
            );
          })}
      </div>
    </>
  );
}
// {!characterSelection && currentImageArray[currentImageIndex] === ansem && <div className="absolute bottom-8 scale-[135%]"><DepositButton onDeposit={handleOnDeposit} isDisabled={false}/></div>}
