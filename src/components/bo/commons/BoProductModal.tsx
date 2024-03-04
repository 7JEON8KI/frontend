import Paper from "@mui/material/Paper";
import React from "react";
import { styled } from "styled-components";

export const ModalBlackOut = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.65);
`;

const BoProductModal = () => {
  return (
    <ModalBlackOut>
      <Paper
        elevation={3}
        sx={{
          width: "512px",
          height: "512px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      ></Paper>
    </ModalBlackOut>
  );
};

export default BoProductModal;
