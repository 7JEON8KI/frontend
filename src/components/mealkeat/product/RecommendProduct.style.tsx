import styled from "styled-components";

export const MiniProduct = styled.div`
  width: 200px;
  height: 315px;
  display: flex;
  position: relative;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.default};
  cursor: pointer;
  overflow: hidden;
  img.food_img {
    width: 200px;
    height: 200px;
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
    height: 115px;
    position: absolute;
    top: 200px;
    left: 0;
    padding: 10px 5px;
  }
`;

interface ContentTextProps {
  $title?: boolean;
  $description?: boolean;
}

export const MiniContentText = styled.div<ContentTextProps>`
  width: 100%;
  height: 30px;
  overflow: hidden;
  white-space: wrap;
  color: ${({ $description }) => ($description ? "#1C5641" : "black")};
  font-weight: ${({ $title }) => ($title ? "bold" : "normal")};
`;

export const MiniContentPrice = styled.div`
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
