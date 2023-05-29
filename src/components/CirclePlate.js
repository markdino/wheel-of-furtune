import { Paper } from "@mui/material";
import styled from "styled-components";

const CirclePlate = styled(Paper)(({ bgcolor, size = '50px' }) => ({
    backgroundColor: `${bgcolor} !important`,
    borderRadius: "50% !important",
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: '10px',
    img: {
        width: 'inherit'
    }
  }));

  export default CirclePlate