import Stack from "@mui/material/Stack";

import React from "react";
import { Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import { changeMenu } from "pages/bo/redux/menu";

const BoNav: React.FC = () => {
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
      <Link to="/bo/admin" onClick={() => handleLinkClick("home")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "home" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>홈</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>회원</Divider>
      <Link to="/bo/admin/member" onClick={() => handleLinkClick("member")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "member" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>회원 목록</Box>
        </Box>
      </Link>
      <Link to="/bo/admin/manager" onClick={() => handleLinkClick("manager")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "manager" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>판매자 목록</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>상품</Divider>
      <Link to="/bo/admin/product" onClick={() => handleLinkClick("product")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "product" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>상품 관리</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>사이트</Divider>
      <Link to="/bo/admin/event" onClick={() => handleLinkClick("event")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "event" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>이벤트 관리</Box>
        </Box>
      </Link>
      <Link to="/bo/admin/banner" onClick={() => handleLinkClick("banner")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: adminMenu === "banner" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>배너 관리</Box>
        </Box>
      </Link>
    </Stack>
  );
};

export default BoNav;
