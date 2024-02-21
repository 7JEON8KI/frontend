import styled from "styled-components";

export const StyledLogo = styled.div.attrs({ className: "logo" })`
  display: inline-block;
  img {
    height: 3.625rem;
    width: 16rem;
    display: inline-block;
    ${({ theme }) => theme.media.sm`        
      height: 2.175rem;
      width: 9.6rem;
    `}
  }
  ${({ theme }) => theme.media.xxl`
    img {
      position: relative;
      left: -10px;
    }
  `}
`;
