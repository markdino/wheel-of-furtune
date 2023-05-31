import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RouletteWheel from "./components/RouletteWheel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Legends from "./components/Legends";
import styled from "styled-components";
import wofLogo from "./assets/Img/WOF.png";
import bg from "./assets/Img/bg.png";
import { Container, Stack, Typography } from "@mui/material";
import Participants from "./components/Participants";
import Main from "./components/Main";
import packageJson from "../package.json";
import Link from "./components/Link";
import Sup from "./components/Sup";
import PlayerWallet from "./components/PlayerWallet";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const HeroLogo = styled("img")({
  width: "100%",
});

function App() {
  const { author, version } = packageJson;

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Main bgimage={bg}>
          <Stack justifyContent="space-between" sx={{ height: '100%'}}>
            <Container maxWidth="xl" sx={{ py: 2 }}>
              <Grid2 container spacing={5}>
                <Grid2 xs={3}>
                  <PlayerWallet />
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
