import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box } from "@mui/material";
import BoMemberTable from "components/bo/commons/BoMemberTable";

const PageAdminMember: React.FC = () => {
  return (
    <BoLayout>
      <Box height="95vh" width="100%" bgcolor="white" p={2} overflow={"auto"}>
        <BoMemberTable />
      </Box>
    </BoLayout>
  );
};
export default PageAdminMember;
