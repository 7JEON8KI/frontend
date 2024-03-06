import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoManagerTable from "components/bo/commons/BoManagerTable";

const PageAdminManager: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <BoLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="판매자 리스트" />
                <Tab label="판매자 신청 리스트" />
              </Tabs>
            </Box>
            <BoManagerTable tab={value} />
          </Paper>
        </Box>
      </Box>
    </BoLayout>
  );
};

export default PageAdminManager;
