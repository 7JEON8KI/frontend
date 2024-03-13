import React from "react";
import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import BoTopbar from "components/bo/global/BoTopbar";
import { StyledBoBody, StyledBoContent, StyledBoLayout, StyledBoSidebar } from "./BoLayout.style";
import { Box } from "@mui/system";
import BoManagerNav from "components/bo/commons/BoManagerNav";
import logo from "assets/images/logo_white.png";
interface Props {
  children: React.ReactNode;
}

const BoManagerLayout = ({ children }: Props): JSX.Element => {
  return (
    <StyledBoLayout>
      <StyledBoBody>
        <StyledBoSidebar>
          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
            <Grid item container xs={2} width={"100%"} alignItems="center" justifyContent="center" bgcolor={"#1C5641"}>
              <Box p={1}>
                <img src={logo} alt="mealkeat 로고" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                <Box p={1} textAlign={"center"} marginTop={1} fontSize={18} color={grey[300]}>
                  판매자
                </Box>
              </Box>
            </Grid>
            <Grid item xs={10} width={"100%"} bgcolor={"#1C5641"}>
              <BoManagerNav />
            </Grid>
          </Grid>
        </StyledBoSidebar>
        <StyledBoContent>
          <BoTopbar />
          <Box sx={{ bgcolor: grey[100], height: "100%", p: 2 }}>{children}</Box>
        </StyledBoContent>
      </StyledBoBody>
    </StyledBoLayout>
  );
};

export default BoManagerLayout;
