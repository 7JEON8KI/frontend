import styled from "styled-components";

export const StyledLogo = styled.div.attrs({ className: "logo" })`
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
