import styled from "styled-components";

export const PurchaseBtn = styled.button.attrs({ type: "button" })`
  width: 90%;
  height: 60px;
  background: #fd6f21;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 1.5rem auto 0;
  &:disabled {
    background: #d0d0d0;
    color: #282828;
  }
`;
