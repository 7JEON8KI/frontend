import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoEventAdd from "components/bo/commons/BoEventAdd";

const PageAdminEvent: React.FC = () => {
  return (
    <BoLayout>
      <Paper elevation={3} sx={{ width: "100%", height: "100%", bgcolor: "white" }}>
        <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
          <Tabs value={1} centered>
            <Tab label="이벤트 관리" />
            <Tab label="이벤트 등록" />
          </Tabs>
        </Box>
        <BoEventAdd />
      </Paper>
    </BoLayout>
  );
};

export default PageAdminEvent;
