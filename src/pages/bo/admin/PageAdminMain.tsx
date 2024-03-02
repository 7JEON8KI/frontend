import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Grid } from "@mui/material";
import { green } from "@mui/material/colors";

const PageAdminMain: React.FC = () => {
  return (
    <BoLayout>
      <Box height="100%" bgcolor="white">
        <Grid container height={"100%"} spacing={2} p={3}>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={"100%"} bgcolor={green[100]} borderRadius={3}></Box>
          </Grid>
        </Grid>
      </Box>
    </BoLayout>
  );
};

export default PageAdminMain;
