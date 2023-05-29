import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RouletteWheel from "./components/RouletteWheel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Legends from "./components/Legends";
import styled from "styled-components";
import wofLogo from "./assets/Img/WOF.png";
import bg from "./assets/Img/bg.png";
import { Container, Stack, Typography } from "@mui/material";
import Participants from "./components/Participants";
import BoxPlate from "./components/BoxPlate";
import { useContext } from "react";
import ParticipantContext from "./store/ParticipantContext";
import Main from "./components/Main";
import PlayerTitle from "./components/PlayerTitle";
import packageJson from "../package.json";
import Link from "./components/Link";
import Sup from "./components/Sup";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const HeroLogo = styled("img")({
  width: "100%",
});

function App() {
  const participants = useContext(ParticipantContext);
  const { author, version } = packageJson;

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Main bgimage={bg}>
          <Stack justifyContent="space-between" sx={{ height: '100%'}}>
            <Container maxWidth="xl" sx={{ py: 2 }}>
              <Grid2 container spacing={5}>
                <Grid2 xs={3}>
                  <BoxPlate sx={{ height: "calc(100% - 200px)", mt: "200px" }}>
                    {participants.player && (
                      <Stack
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <section>
                          <PlayerTitle
                            sx={{ color: "#000", margin: "10px 14px 20px" }}
                          >{`Player: ${participants.player?.name}`}</PlayerTitle>
                          <Typography>Prizes: </Typography>
                          <ol>
                            {participants.player.prizes.map((prize) => (
                              <li>
                                <strong>
                                  {typeof prize === "number"
                                    ? `Php ${prize}.00`
                                    : prize}
                                </strong>
                              </li>
                            ))}
                          </ol>
                        </section>
                        <Typography>
                          {`Total Cash Prize: Php ${participants.player.getTotalPrizes()}.00 ${
                            participants.player.hasJackpot
                              ? "with a Jackpot prize"
                              : ""
                          }`}
                        </Typography>
                      </Stack>
                    )}
                  </BoxPlate>
                </Grid2>
                <Grid2 xs={5}>
                  <Legends />
                  <RouletteWheel />
                </Grid2>
                <Grid2 xs={4}>
                  <HeroLogo src={wofLogo} alt="Wheel of furtune" />
                  <Participants />
                </Grid2>
              </Grid2>
            </Container>
            <Stack direction="row" justifyContent="space-between" sx={{ px: 4, py: 2}}>
              <Typography color='#1a3c7a'>{`version: ${version}`}</Typography>
              <Typography color='#1a3c7a'>
                {"Develop and design with ❤️ by "}
                <Link href={author?.url} target="_blank">
                  {author?.name}
                </Link>
                {" © "}
                <Sup>{new Date().getFullYear()}</Sup>
              </Typography>
            </Stack>
          </Stack>
        </Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
