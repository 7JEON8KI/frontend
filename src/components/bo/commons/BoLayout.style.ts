import styled from "styled-components";

export const StyledBoLayout = styled.div.attrs({ id: "container" })`
  width: 100%;
  height: 100%;
`;

export const StyledBoBody = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 8% 92%;
`;

export const StyledBoSidebar = styled.div`
  height: 100%;
  background-color: #000000;
  display: grid;
`;
export const StyledBoContent = styled.div`
  height: 100%;
  background-color: #e6e6e6;
`;
