import { Box } from "@mui/material";
import logo from "assets/images/logo.png";
import React from "react";

export const BoIcon = (): JSX.Element => {
  return (
    <Box p={1}>
      <img src={logo} alt="mealkeat 로고" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      <Box p={1} textAlign={"center"} marginTop={1} fontSize={20}>
        관리자님
      </Box>
    </Box>
  );
};
