import React from "react";
import styled from "styled-components";
import logo from "assets/images/logo.png";

const StyledLogo = styled.div.attrs({ className: "logo" })`
  display: inline-block;
  img {
    height: 3rem;
    width: 10rem;
    display: inline-block;
    ${({ theme }) => theme.media.mobile`        
      height: 2rem;
      width: 6.7rem;
    `}
  }
`;

const Logo = (): JSX.Element => {
  return (
    <StyledLogo>
      <img src={logo} alt="mealkeat 로고" />
    </StyledLogo>
  );
};

export default Logo;
