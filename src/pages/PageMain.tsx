import React from "react";
import Layout from "components/commons/Layout";
import {
  StyledContentPrice,
  StyledContentText,
  StyledGridContainer,
  StyledProduct,
  StyledTitle,
  StyledMainDiv,
} from "styles/pages/PageMain.style";

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
    <Layout>
      <StyledMainDiv>
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
      </StyledMainDiv>
    </Layout>
  );
};

export default PageMain;
