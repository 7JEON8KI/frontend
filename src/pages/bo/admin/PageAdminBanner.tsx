import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoBannerAdd from "components/bo/commons/BoBannerAdd";

const PageAdminBanner: React.FC = () => {
  return (
    <BoLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
              <Tabs value={0} centered>
                <Tab label="배너 관리" />
              </Tabs>
            </Box>
            <BoBannerAdd />
          </Paper>
        </Box>
      </Box>
    </BoLayout>
  );
};

export default PageAdminBanner;
