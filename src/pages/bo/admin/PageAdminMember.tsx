import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import BoMemberTable from "components/bo/commons/BoMemberTable";

const PageAdminMember: React.FC = () => {
  return (
    <BoLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Tabs value={0} centered>
              <Tab label="회원 리스트" />
            </Tabs>
            <BoMemberTable />
          </Paper>
        </Box>
      </Box>
    </BoLayout>
  );
};
export default PageAdminMember;
