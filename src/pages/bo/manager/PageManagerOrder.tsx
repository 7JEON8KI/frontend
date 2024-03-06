import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import BoOrderTable from "components/bo/manager/BoOrderTable";
import React from "react";

const PageManagerOrder: React.FC = () => {
  return (
    <BoManagerLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
              <Tabs value="0" centered>
                <Tab label="판매 내역" />
              </Tabs>
            </Box>
            <BoOrderTable />
          </Paper>
        </Box>
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerOrder;
