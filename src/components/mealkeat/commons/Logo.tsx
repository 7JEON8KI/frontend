import React from "react";
import logo from "assets/images/logo.png";
import { StyledLogo } from "./Logo.style";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";

const Logo = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <StyledLogo
      onClick={() => {
        scrollToTop({ smooth: false });
        navigate("/");
      }}
    >
      <img src={logo} alt="mealkeat 로고" title="클릭 시 메인으로 이동" />
    </StyledLogo>
  );
};

export default Logo;
