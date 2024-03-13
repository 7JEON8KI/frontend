import { Box } from "@mui/material";
import logo from "assets/images/logo_white.png";
import React from "react";

export const BoIcon = (): JSX.Element => {
  return (
    <Box p={1}>
      <img src={logo} alt="mealkeat 로고" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      <Box p={1} textAlign={"center"} marginTop={1} fontSize={18}>
        관리자
      </Box>
    </Box>
  );
};
