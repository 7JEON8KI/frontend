import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Grid, Paper } from "@mui/material";
import RevenueChart from "components/bo/graph/RevenueChart";
import SaleAmountChart from "components/bo/graph/SaleAmountChart";
import BestList from "components/bo/global/BestList";
import SearchChart from "components/bo/graph/SearchChart";

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
          <Grid item xs={8} height={500} width={"100%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ p: 2 }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  가장 많이 팔린 상품
                </span>
                <BestList />
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
          <Grid item xs={8} height={500} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>밀키트 검색량(월별)</h3>
              </Box>
              <Box paddingRight={2} height={400}>
                <SearchChart />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </BoLayout>
  );
};

export default PageAdminMain;
