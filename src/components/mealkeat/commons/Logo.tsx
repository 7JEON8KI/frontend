import React from "react";
import logo from "assets/images/logo.png";
import { StyledLogo } from "./Logo.style";

const Logo = (): JSX.Element => {
  return (
    <StyledLogo>
      <img src={logo} alt="mealkeat 로고" title="클릭 시 메인으로 이동" />
    </StyledLogo>
  );
};

export default Logo;
