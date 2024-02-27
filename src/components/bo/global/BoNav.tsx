import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { blueGrey } from "@mui/material/colors";

export const BoNav = (): JSX.Element => {
  return (
    <Stack direction="column" spacing={2}>
      <Button variant="outlined" sx={{ bgcolor: blueGrey[100], color: "white" }} endIcon={<SendIcon />}>
        홈
      </Button>
      <Button variant="contained" sx={{ bgcolor: blueGrey[100], color: "white" }} endIcon={<SendIcon />}>
        회원
      </Button>
      <Button variant="contained" sx={{ bgcolor: blueGrey[900], color: "white" }} endIcon={<SendIcon />}>
        상품
      </Button>
      <Button variant="outlined" sx={{ bgcolor: blueGrey[100], color: "white" }} endIcon={<SendIcon />}>
        이벤트
      </Button>
      <Button variant="outlined" endIcon={<SendIcon />}>
        배너
      </Button>
      <Button variant="outlined" endIcon={<SendIcon />}>
        팝업
      </Button>
    </Stack>
  );
};
