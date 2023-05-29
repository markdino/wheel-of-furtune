import { Paper } from "@mui/material";
import styled from "styled-components";

const active = {
    borderColor: "#fce76a",
    backgroundColor: "#0b1733",
    p: {
        color: "#fce76a",
        fontWeight: "700"
    }
  }

const Box = styled('section')(({ selectable }) => ({
    backgroundColor: "#071735",
    borderColor: "#f8c05e",
    borderWidth: "4px",
    borderStyle: 'solid',
    padding: '16px',
    position: 'relative',
    color: "#fff !important",
    height: '100%',
    '.closeButton': {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: 0,
      opacity: 0,
      transition: 'opacity .25s ease-in-out',
      '-moz-transition': 'opacity .25s ease-in-out',
      '-webkit-transition': 'opacity .25s  ease-in-out',
    },
    '&:hover .closeButton': {
      opacity: 1,
    },
    '&.active': active,
    ...(selectable && {
      '&:hover': { ...active, cursor: 'pointer' },
    }),
  }))

const BoxPlate = ({ children, selectable, active, sx, ...props }) => {
  return (
    <Paper elevation={3} sx={sx}>
      <Box selectable={selectable} className={active ? 'active' : ''} {...props}>
        {children}
      </Box>
    </Paper>
  );
};

export default BoxPlate;
