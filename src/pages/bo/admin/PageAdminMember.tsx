import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Tab, Tabs } from "@mui/material";
import BoMemberTable from "components/bo/commons/BoMemberTable";

const PageAdminMember: React.FC = () => {
  return (
    <BoLayout>
      <Box height="95vh" width="100%" bgcolor="white" p={2} overflow={"auto"}>
        <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
          <Tabs value={0} centered>
            <Tab label="회원 리스트" />
          </Tabs>
        </Box>
        <BoMemberTable />
      </Box>
    </BoLayout>
  );
};
export default PageAdminMember;
