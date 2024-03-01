import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Tab, Tabs } from "@mui/material";
import BoManagerTable from "components/bo/commons/BoManagerTable";

const PageAdminManager: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <BoLayout>
      <Box height="95vh" width="100%" bgcolor="white" p={2} overflow={"auto"}>
        <Box sx={{ width: "100%", bgcolor: "background.paper", paddingTop: 2 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="판매자 리스트" />
            <Tab label="판매자 신청 리스트" />
          </Tabs>
        </Box>
        <BoManagerTable />
      </Box>
    </BoLayout>
  );
};

export default PageAdminManager;
