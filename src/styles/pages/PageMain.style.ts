import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

export const StyledMainDiv = styled.main`
  width: 100%;
  height: 100%;
`;

interface StyledTitleProps {
  $paddingLeft: number;
}

export const StyledTitle = styled.div<StyledTitleProps>`
  font-size: 2.5rem;
  font-weight: bold;
  padding-left: ${({ $paddingLeft }) => $paddingLeft}px;
  margin-top: 1.8rem;
  margin-bottom: 0.9rem;
  ${({ theme }) => theme.media.mobile`
    font-size: 1.25rem;
  `}
`;

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 50px 0;

  @media screen and (max-width: 1510px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 770px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const StyledProduct = styled.div`
  width: 285px;
  height: 426px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
    border: 1px #d9d9d9 solid;
    display: inline-block;
  }

  .content {
    background: #ffffff;
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
interface StyledContentTextProps {
  $title?: boolean;
  $description?: boolean;
}

export const StyledContentText = styled.div<StyledContentTextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
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
    font-size: 1.5rem;
    color: #fd6f21;
  }
  div:nth-child(2) {
    font-size: 1.5rem;
    font-weight: 600;
  }
  div:nth-child(3) {
    font-size: 1.25rem;
    color: #c4c4c4;
    text-decoration: line-through;
    font-weight: 600;
  }
`;
