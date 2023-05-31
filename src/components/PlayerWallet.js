import { useContext } from "react";
import ParticipantContext from "../store/ParticipantContext";
import BoxPlate from "./BoxPlate";
import { Stack, Typography } from "@mui/material";
import PlayerTitle from "./PlayerTitle";

const PlayerWallet = () => {
  const participants = useContext(ParticipantContext);
  return (
    <BoxPlate sx={{ height: "calc(100% - 200px)", mt: "200px" }}>
      {participants.player && (
        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
          <section>
            <PlayerTitle
              sx={{ color: "#000", margin: "10px 14px 20px" }}
            >{`Player: ${participants.player?.name}`}</PlayerTitle>
            <Typography>Prizes: </Typography>
            <ol>
              {participants.player.prizes.map((prize, index) => (
                <li key={index}>
                  <strong>
                    {typeof prize === "number" ? `Php ${prize}.00` : prize}
                  </strong>
                </li>
              ))}
            </ol>
          </section>
          <Typography>
            {`Total Cash Prize: Php ${participants.player.getTotalPrizes()}.00 ${
              participants.player.hasJackpot ? "with a Jackpot prize" : ""
            }`}
          </Typography>
        </Stack>
      )}
    </BoxPlate>
  );
};

export default PlayerWallet;
