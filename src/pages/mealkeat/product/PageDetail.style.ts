import styled from "styled-components";

export const StyledAmountBtn = styled.button.attrs({ type: "button" })`
  width: 40px;
  height: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #237c60;
  color: white;
  &:disabled {
    background-color: #d0d0d0;
    color: black;
  }
`;

export const ProductDetailContainer = styled.div`
  width: 1320px;
  display: flex;
  margin: 60px auto;
  justify-content: space-between;
`;

export const ProductImageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0.5rem;
  justify-content: start;
  align-items: center;
  gap: 1.5rem;
`;

export const ProductMiniImage = styled.div`
  display: flex;
  gap: 1rem;
  width: 560px;
  flex-wrap: wrap;
`;

export const ProductDescription = styled.div`
  width: 670px;
  display: inline-flex;
  flex-direction: column;
`;

interface FlexColProps {
  $padding?: string;
  $gap?: string;
  $justifyContent?: string;
  $borderTop?: string;
  $border?: string;
  $borderRadius?: string;
}
export const ProductFlexCol = styled.div<FlexColProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) => ($justifyContent !== undefined ? $justifyContent : "space-around")};
  gap: ${({ $gap }) => ($gap !== undefined ? $gap : "1.5rem")};
  padding: ${({ $padding }) => ($padding !== undefined ? $padding : "0")};
  border-top: ${({ $borderTop }) => ($borderTop !== undefined ? $borderTop : "none")};
  border: ${({ $border }) => ($border !== undefined ? $border : "none")};
  border-radius: ${({ $borderRadius }) => ($borderRadius !== undefined ? $borderRadius : "none")};
`;

interface DeliveryInfoProps {
  $color?: string;
}

export const DeliveryInfo = styled.div<DeliveryInfoProps>`
  width: 130px;
  height: 40px;
  border: 2px solid ${({ $color }) => ($color !== undefined ? $color : "black")};
  color: ${({ $color }) => ($color !== undefined ? $color : "black")};
  fontweight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const ProductInfoListContainer = styled.div`
  display: grid;
  gap: 5rem;
  justify-content: start;
  grid-template-columns: 1fr 5fr;
  & > span:nth-child(1) {
    font-weight: bold;
  }
`;

export const ProductAmountInput = styled.input.attrs({ type: "number" })`
  width: 60px;
  height: 35px;
  padding: 1rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  font-weight: bold;
  font-size: 1.25rem;
`;
