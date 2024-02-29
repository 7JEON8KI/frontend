import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box } from "@mui/material";
import BoMemberTable from "components/bo/commons/BoMemberTable";

const PageAdminManager: React.FC = () => {
  return (
    <BoLayout>
      <Box height="95vh" width="100%" bgcolor="white" overflow={"auto"} sx={{}}>
        <BoMemberTable />
      </Box>
    </BoLayout>
  );
};

export default PageAdminManager;
