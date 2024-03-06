import React from "react";
import { Grid } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { BoIcon } from "components/bo/global/BoIcon";
import BoNav from "components/bo/commons/BoNav";
import BoTopbar from "components/bo/global/BoTopbar";
import { StyledBoBody, StyledBoContent, StyledBoLayout, StyledBoSidebar } from "./BoLayout.style";
import { Box } from "@mui/system";

interface Props {
  children: React.ReactNode;
}

const BoLayout = ({ children }: Props): JSX.Element => {
  return (
    <StyledBoLayout>
      <StyledBoBody>
        <StyledBoSidebar>
          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
            <Grid item container xs={2} width={"100%"} alignItems="center" justifyContent="center" bgcolor={green[700]}>
              <BoIcon />
            </Grid>
            <Grid item xs={10} width={"100%"} bgcolor={green[700]}>
              <BoNav />
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

export default BoLayout;
