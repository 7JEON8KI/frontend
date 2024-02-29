import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import BoProductTable from "components/bo/commons/BoProcutTable";

const PageAdminProduct: React.FC = () => {
  return (
    <BoLayout>
      <BoProductTable />
    </BoLayout>
  );
};

export default PageAdminProduct;
