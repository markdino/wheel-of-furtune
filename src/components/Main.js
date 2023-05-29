import styled from "styled-components";

const Main = styled("main")(({ bgimage }) => ({
  width: "100%",
  height: "100vh",
  backgroundPosition: "top center",
  backgroundSize: "cover",
  backgroundImage: `url(${bgimage})`,
}));

export default Main;
