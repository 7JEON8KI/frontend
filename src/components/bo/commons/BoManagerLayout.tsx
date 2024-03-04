import React from "react";
import { Grid } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { BoIcon } from "components/bo/global/BoIcon";
// import BoTopbar from "components/bo/global/BoTopbar";
import { StyledBoBody, StyledBoContent, StyledBoLayout, StyledBoSidebar } from "./BoLayout.style";
import { Box } from "@mui/system";
import { BoManagerNav } from "../global/BoManagerNav";

interface Props {
  children: React.ReactNode;
}

const BoManagerLayout = ({ children }: Props): JSX.Element => {
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
              bgcolor={blueGrey[200]}
            >
              <BoIcon />
            </Grid>
            <Grid item xs={10} width={"100%"} bgcolor={blueGrey[200]}>
              <BoManagerNav />
            </Grid>
          </Grid>
        </StyledBoSidebar>
        <StyledBoContent>
          <Box sx={{ bgcolor: grey[300], height: "100%", p: 2 }}>{children}</Box>
        </StyledBoContent>
      </StyledBoBody>
    </StyledBoLayout>
  );
};

export default BoManagerLayout;
