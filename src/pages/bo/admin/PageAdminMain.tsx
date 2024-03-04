import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box } from "@mui/material";

const PageAdminMain: React.FC = () => {
  return (
    <BoLayout>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box component="main" sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}></Box>
      </Box>
    </BoLayout>
  );
};

export default PageAdminMain;
