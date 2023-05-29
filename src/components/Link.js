import styled from "styled-components";

const Link = styled("a")({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default Link;
