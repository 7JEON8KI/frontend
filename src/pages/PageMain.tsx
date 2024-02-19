/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "components/commons/Footer";
import TopNav from "components/commons/TopNav";
import React from "react";
import styled from "styled-components";

const StyledMainDiv = styled.div`
  width: 100%;
  height: 100%;
  & > .title {
    font-size: 2.5rem;
    font-family: "Inter";
    font-weight: bold;
  }
`;

interface StyledTitleProps {
  $paddingLeft: number;
}

const StyledTitle = styled.div<StyledTitleProps>`
  font-size: 2.5rem;
  font-family: "Inter";
  font-weight: bold;
  padding-left: ${({ $paddingLeft }) => $paddingLeft}px;
  margin-top: 1.8rem;
  margin-bottom: 0.9rem;
  ${({ theme }) => theme.media.mobile`
    font-size: 1.25rem;
  `}
`;

const StyledGridContainer = styled.div`
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

const StyledProduct = styled.div`
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

const StyledContentText = styled.div<StyledContentTextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: ${({ $description }) => ($description ? "#1C5641" : "black")};
  font-weight: ${({ $title }) => ($title ? "bold" : "normal")};
`;

const StyledContentPrice = styled.div`
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

const PageMain: React.FC = () => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const [itemRect, setItemRect] = React.useState<number | null>(null);
  const products = Array(12)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/400x400",
      title: `${idx + 1}.[새벽시장] 맛있는 명인 손만두, 최대 두줄까지 작성 가능합니다........`,
      description:
        "내용입니다. 최대 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 두줄까지~~!! 까지 ...",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    }));

  React.useEffect(() => {
    if (gridRef.current && firstItemRef.current) {
      const newItemRect =
        gridRef.current.getBoundingClientRect().width >= 2100 ? 116.25 : firstItemRef.current.getBoundingClientRect().x;
      setItemRect(newItemRect);
    }
  }, [firstItemRef]);

  return (
    <StyledMainDiv>
      <TopNav overlapGroupClassName="" divClassName="" />
      <StyledTitle $paddingLeft={itemRect || 0}>Best Meal</StyledTitle>
      <StyledGridContainer ref={gridRef}>
        {products.map((product, index) => (
          <StyledProduct key={index} ref={index == 0 ? firstItemRef : null}>
            <img className="food_img" src={product.imageUrl} alt="" />
            <div className="content">
              <StyledContentText $title={true}>{product.title}</StyledContentText>
              <StyledContentText $description={true}>{product.description}</StyledContentText>
              <StyledContentPrice>
                <div>{product.discount}</div>
                <div>{product.price}</div>
                <div>{product.originalPrice}</div>
                <img className="cart_btn" src="https://via.placeholder.com/50x50" alt="" />
              </StyledContentPrice>
              {product.soldOut && <div>일시 품절</div>}
            </div>
          </StyledProduct>
        ))}
      </StyledGridContainer>

      {/*
      <div className="m-auto w-[1200px] text-left font-['Inter'] text-[2.5rem] font-bold leading-[3rem] text-neutral-700">
        저녁엔 이거 어때요?
      </div>*/}
      <Footer />
    </StyledMainDiv>
  );
};

export default PageMain;
