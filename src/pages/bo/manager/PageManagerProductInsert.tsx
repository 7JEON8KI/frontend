import { Box } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import ProductForm from "components/bo/manager/ProductForm";
import React from "react";

const PageManagerProductInsert: React.FC = () => {
  return (
    <BoManagerLayout>
      <Box display="flex" width={"100%"} height={"100%"} justifyContent="center" alignItems="center">
        <ProductForm />
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerProductInsert;
