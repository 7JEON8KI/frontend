import styled from "styled-components";

export const StyledProduct = styled.div`
  width: 285px;
  height: 426px;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.default};
  img.food_img {
    width: 285px;
    height: 285px;
    position: absolute;
    top: 0;
    left: 0;
  }

  img.cart_btn {
    width: 35px;
    height: 35px;
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    display: inline-block;
  }

  .content {
    background: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    width: 285px;
    top: 285px;
    left: 0;
    padding: 10px 5px;
  }
`;

export const StyledMiniProduct = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.default};
  img.food_img {
    width: 200px;
    height: 200px;
  }

  img.cart_btn {
    width: 25px;
    height: 25px;
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    display: inline-block;
  }

  .content {
    background: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 200px;
    padding: 10px 5px;
  }
`;
interface StyledContentTextProps {
  $title?: boolean;
  $description?: boolean;
}

export const StyledContentText = styled.div<StyledContentTextProps>`
  width: 100%;
  ${({ theme }) => theme.util.truncate};
  color: ${({ $description }) => ($description ? "#1C5641" : "black")};
  font-weight: ${({ $title }) => ($title ? "bold" : "normal")};
`;

export const StyledMiniContentText = styled.div<StyledContentTextProps>`
  width: 100%;
  height: 30px;
  overflow: hidden;
  white-space: wrap;
  color: ${({ $description }) => ($description ? "#1C5641" : "black")};
  font-weight: ${({ $title }) => ($title ? "bold" : "normal")};
`;

export const StyledContentPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  div:nth-child(1) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    color: ${({ theme }) => theme.colors.mainColor};
  }
  div:nth-child(2) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 600;
  }
  div:nth-child(3) {
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.mediumGrey};
    text-decoration: line-through;
    font-weight: 600;
  }
`;

export const StyledMiniContentPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  div:nth-child(1) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.mainColor};
  }
  div:nth-child(2) {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
  }
  div:nth-child(3) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.mediumGrey};
    text-decoration: line-through;
    font-weight: 600;
  }
`;
