import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Grid, Paper } from "@mui/material";
import RevenueChart from "components/bo/graph/RevenueChart";
import SaleAmountChart from "components/bo/graph/SaleAmountChart";
import ItemList from "components/bo/global/ItemList";
const PageAdminMain: React.FC = () => {
  return (
    <BoLayout>
      <Box display="flex" height={"100%"} width={"100%"} justifyContent="center" alignItems="center">
        <Grid container height={"100%"} width={"100%"} spacing={6}>
          <Grid item xs={4} height={"50%"} gridColumn={6} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매금액(일별)</h3>
              </Box>
              <Box paddingRight={2}>
                <RevenueChart />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ p: 2 }}>
                <h2>최근 판매된 상품</h2>
                <ItemList />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ p: 2 }}>
                <h2>가장 많이 팔린 상품</h2>
                <ItemList />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매량(일별)</h3>
              </Box>
              <SaleAmountChart />
            </Paper>
          </Grid>
          <Grid item xs={8} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}></Paper>
          </Grid>
        </Grid>
      </Box>
    </BoLayout>
  );
};

export default PageAdminMain;
