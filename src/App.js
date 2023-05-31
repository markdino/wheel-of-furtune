import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RouletteWheel from "./components/RouletteWheel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Legends from "./components/Legends";
import styled from "styled-components";
import wofLogo from "./assets/Img/WOF.png";
import bg from "./assets/Img/bg.png";
import { Container, Stack } from "@mui/material";
import Participants from "./components/Participants";
import Main from "./components/Main";
import PlayerWallet from "./components/PlayerWallet";
import Footer from "./components/Footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const HeroLogo = styled("img")({
  width: "100%",
});

function App() {
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
            <Footer />
          </Stack>
        </Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
