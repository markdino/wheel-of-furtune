import styled from "styled-components";

const PlayerTitle = styled("h2")(({sx})=>({
  padding: '16px',
  backgroundColor: "#f8c05e",
  borderRadius: "10px",
  textAlign: 'center',
  fontWeight: 700,
  ...sx,
}));

export default PlayerTitle
