import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Paper } from "@mui/material";

const PageAdminBanner: React.FC = () => {
  return (
    <BoLayout>
      <Paper elevation={3} sx={{ width: "100%", height: "100%", bgcolor: "white" }}></Paper>
    </BoLayout>
  );
};

export default PageAdminBanner;
