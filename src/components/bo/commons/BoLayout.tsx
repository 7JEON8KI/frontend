import React from "react";
import { Grid } from "@mui/material";
import { blueGrey, green } from "@mui/material/colors";
import { BoIcon } from "components/bo/global/BoIcon";
import { BoNav } from "components/bo/global/BoNav";
import BoTopbar from "components/bo/global/BoTopbar";
import { StyledBoBody, StyledBoContent, StyledBoLayout, StyledBoSidebar } from "./BoLayout.style";

interface Props {
  children: React.ReactNode;
}

const BoLayout = ({ children }: Props): JSX.Element => {
  return (
    <StyledBoLayout>
      <StyledBoBody>
        <StyledBoSidebar>
          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
            <Grid
              item
              container
              xs={2}
              width={"100%"}
              alignItems="center"
              justifyContent="center"
              bgcolor={blueGrey[100]}
            >
              <BoIcon />
            </Grid>
            <Grid item xs={8} width={"100%"} bgcolor={blueGrey[300]}>
              <BoNav />
            </Grid>
            <Grid item xs={2} width={"100%"} bgcolor={blueGrey[900]}></Grid>
          </Grid>
        </StyledBoSidebar>
        <StyledBoContent>
          <Grid container direction="column">
            <Grid item xs={1} height={"100%"} width={"100%"} bgcolor={green[100]} p={2}>
              {/* <BoTopbar />  */}
            </Grid>
            <Grid item xs={11} bgcolor={green[300]} p={2}>
              {children}
            </Grid>
          </Grid>
        </StyledBoContent>
      </StyledBoBody>
    </StyledBoLayout>
  );
};

export default BoLayout;
