import punchSound from "../assets/punch1.m4a";
import winSound from "../assets/win.m4a";
import loseSound from "../assets/lose.m4a";
import bellSound from "../assets/bell.m4a";
import t3Sound from "../assets/tier3powerup1.m4a";
import bgSound from "../assets/background.mp3";
import "./Homepage.css";
import dodge from "../assets/dodge.mp3";
const SoundTypes = {
  PUNCH: "punch",
  WIN: "win",
  LOSE: "lose",
  BELL: "bell",
  TIER3: "t3",
  dodge: "dodge",
};

const sounds = {
  [SoundTypes.PUNCH]: punchSound,
  [SoundTypes.WIN]: winSound,
  [SoundTypes.LOSE]: loseSound,
  [SoundTypes.BELL]: bellSound,
  [SoundTypes.TIER3]: t3Sound,
  [SoundTypes.dodge]: dodge,
  background: bgSound,
};

//cp this
const WIN_PUNCHES = 13;
export {
  SoundTypes,
  sounds,
  WIN_PUNCHES,
};
