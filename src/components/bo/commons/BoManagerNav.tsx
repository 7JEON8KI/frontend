import Stack from "@mui/material/Stack";

import React from "react";
import { Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import { changeMenu } from "pages/bo/redux/menu";

const BoManagerNav: React.FC = () => {
  const adminMenu = useSelector((state: RootState) => state.menu.menu);
  const dispatch = useDispatch();

  const onChangeMenu = (diff: string) => {
    dispatch(changeMenu(diff));
  };

  const handleLinkClick = (link: string) => {
    onChangeMenu(link);
  };
  return (
    <Stack direction="column">
      <Link to="/bo/manager" onClick={() => handleLinkClick("manager/home")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "manager/home" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>홈</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>상품</Divider>
      <Link to="/bo/manager/product/insert" onClick={() => handleLinkClick("manager/product/insert")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "manager/product/insert" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>상품 등록</Box>
        </Box>
      </Link>
      <Link to="/bo/manager/product" onClick={() => handleLinkClick("manager/product")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "manager/product" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>상품 관리</Box>
        </Box>
      </Link>
      <Link to="/bo/manager/order" onClick={() => handleLinkClick("manager/order")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "manager/order" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>주문 관리</Box>
        </Box>
      </Link>
    </Stack>
  );
};

export default BoManagerNav;
