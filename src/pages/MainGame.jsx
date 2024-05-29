import React, { useContext, useEffect, useState, useRef } from "react";
import init, { render } from "ansem-wasm";
import { Context } from "../App";
import t3_cook_win from "../assets/t3_cook_win.png";
import { generateLink } from "../helpers/generateLink";
import GameCover from "./GameCover";
import GameOverPopUp from "./GameOverPopUp";
import { useWallet } from "@solana/wallet-adapter-react";
import { getLeaderboardData, handleSendData } from "../helpers/dataHandlers";
import { WIN_PUNCHES } from "./gameConfig";
import winImage from "../assets/win.png";
import loseImage from "../assets/lose.png";
import loseImage_cook from "../assets/lose_cook.png";

const MainGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    wifAmount,
    setWifAmount,
    player,
    setLeaderboard,
    referredBy
  } = useContext(Context);
  const [tweetImage, setTweetImage] = useState("");
  const [SNSlink, setSNSLink] = useState("");
  const [gameCover, setGameCover] = useState(false);
  const wallet = useWallet();
  const hasLoaded = useRef(false);
  
  const onLoad = async () => {
    await init();
    const npunch = await render(player, wifAmount);
    await handleSendData(npunch, wifAmount, referredBy, wallet);
    await getLeaderboardData(setLeaderboard);
    setGameCover(true);
    if (npunch > WIN_PUNCHES) {
      if (player === "ansem") {
        setTweetImage(winImage);
        setSNSLink(generateLink(npunch, wifAmount, "https://imgur.com/oNrbl9E"));
      } else {
        setTweetImage(t3_cook_win);
        setSNSLink(generateLink(npunch, wifAmount, "https://imgur.com/e5edNC9"));
      }
    } else {
      if (player === "ansem") {
        setTweetImage(loseImage);
        setSNSLink(generateLink(npunch, wifAmount, "https://imgur.com/0OJA4Pm"));
      } else {
        setTweetImage(loseImage_cook);
        setSNSLink(generateLink(npunch, wifAmount, "https://imgur.com/lnUa62f"));
      }
    }
  };

  useEffect(() => {
    if (!hasLoaded.current) {
      const loadGame = async () => {
        await onLoad();
      };
      loadGame();
      hasLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (SNSlink && SNSlink !== "") {
      setIsOpen(true);
    }
  }, [SNSlink]);

  const closePopUp = () => {
    setIsOpen(false);
    setSNSLink("");
    setWifAmount(0);
  };

  return (
    <>
      <GameOverPopUp
        isOpen={isOpen}
        onClose={closePopUp}
        image={tweetImage}
        link={SNSlink}
      />
      {!gameCover ? (
        <>
          <img id="gameImageId" alt="Game character" />
          <div className="absolute left-7 text-3xl custom-heading">
            <p>
              Punches Landed: <span id="punchesCounterId"></span>
            </p>
            <p>
              Dodges: <span id="dodgesCounterId"></span>
            </p>
          </div>
        </>
      ) : (
        <GameCover />
      )}
    </>
  );
};

export default MainGame;
