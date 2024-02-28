import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import BoProductTable from "components/bo/commons/BoProcutTable";

const PageAdminProduct: React.FC = () => {
  return (
    <BoLayout>
      <BoProductTable />
    </BoLayout>
  );
};

export default PageAdminProduct;
