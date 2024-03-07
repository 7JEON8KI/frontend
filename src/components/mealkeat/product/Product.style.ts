import styled from "styled-components";

export const ProductContainer = styled.div`
  width: 285px;
  height: 435px;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.default};
  cursor: pointer;
  overflow: hidden;
  img.food_img {
    width: 285px;
    height: 285px;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }
  img.food_img:hover {
    opacity: 0.8;
    scale: 1.3;
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

interface ContentTextProps {
  $title?: boolean;
  $description?: boolean;
}

export const ContentText = styled.div<ContentTextProps>`
  width: 100%;
  ${({ theme }) => theme.util.truncate};
  color: ${({ $description }) => ($description ? "#1C5641" : "black")};
  font-weight: ${({ $title }) => ($title ? "bold" : "normal")};
  overflow: hidden;
  white-space: wrap;
`;

export const ContentPrice = styled.div`
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
