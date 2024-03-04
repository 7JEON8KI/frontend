import Stack from "@mui/material/Stack";

import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export const BoManagerNav = (): JSX.Element => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <Stack direction="column">
      <Link to="/bo/admin" onClick={() => handleLinkClick("/bo/admin")}>
        <Box
          textAlign={"center"}
          fontSize={18}
          sx={{ color: activeLink === "/bo/admin" ? "black" : "white", padding: 2, cursor: "pointer" }}
        >
          <Box>홈</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>회원</Divider>
      <Link to="/bo/admin/member" onClick={() => handleLinkClick("/bo/admin/member")}>
        <Box textAlign={"center"} fontSize={18} sx={{ color: "white", padding: 2, cursor: "pointer" }}>
          <Box>회원 목록</Box>
        </Box>
      </Link>
      <Link to="/bo/admin/manager" onClick={() => handleLinkClick("/bo/admin/manager")}>
        <Box textAlign={"center"} fontSize={18} sx={{ color: "white", padding: 2, cursor: "pointer" }}>
          <Box>판매자 목록</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>상품</Divider>
      <Link to="/bo/admin/product" onClick={() => handleLinkClick("/bo/admin/product")}>
        <Box textAlign={"center"} fontSize={18} sx={{ color: "white", padding: 2, cursor: "pointer" }}>
          <Box>상품 관리</Box>
        </Box>
      </Link>
      <Divider sx={{ fontSize: "14px" }}>사이트</Divider>
      <Link to="/bo/admin/event" onClick={() => handleLinkClick("/bo/admin/event")}>
        <Box textAlign={"center"} fontSize={18} sx={{ color: "white", padding: 2, cursor: "pointer" }}>
          <Box>이벤트 관리</Box>
        </Box>
      </Link>
      <Link to="/bo/admin/banner" onClick={() => handleLinkClick("/bo/admin/banner")}>
        <Box textAlign={"center"} fontSize={18} sx={{ color: "white", padding: 2, cursor: "pointer" }}>
          <Box>배너 관리</Box>
        </Box>
      </Link>
    </Stack>
  );
};
