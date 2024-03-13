import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import BoProductTable from "components/bo/commons/BoProductTable";

import React from "react";

const PageManagerProduct: React.FC = () => {
  return (
    <BoManagerLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
              <Tabs value={0} centered>
                <Tab label="판매 상품 리스트" />
              </Tabs>
            </Box>
            <BoProductTable />
          </Paper>
        </Box>
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerProduct;
