import React from "react";
import logo from "assets/images/logo.png";
import { StyledLogo } from "./Logo.style";

const Logo = (): JSX.Element => {
  return (
    <StyledLogo>
      <img src={logo} alt="mealkeat 로고" />
    </StyledLogo>
  );
};

export default Logo;
