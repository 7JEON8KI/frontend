import React, { useEffect } from "react";
import { Layout, Product } from "components/mealkeat";
import {
  StyledListGrid,
  StyledSidebarDiv,
  StyledMain,
  StyledSidebarAside,
  StyledInfoDivFirst,
  StyledInfoDiv,
  StyledScrollToTop,
  StyledMenuNav,
  StyledMenuTitle,
  StyledMenuInfo,
  StyledItemCount,
  StyledProductGrid,
} from "./PageList.style";
import scrollToTop from "utils/scrollToTop";
import productApi from "apis/productApi";
import { ProductResponse, ProductSortRequest } from "models/mealkeat/ProductModels";
import { Sort } from "constants/productConstants";

const PageBest: React.FC = () => {
  const [productList, setProductList] = React.useState<ProductResponse>();

  const getProducts = async () => {
    const fetchProduct = await productApi.getProducts({
      productCriteria: {
        pageNum: 1,
        pageAmount: 12,
        sort: Sort.MOST_ORDER, // 많이 팔린 순
        includeSoldOut: 1, // 품절 제외
      },
    } as ProductSortRequest);
    setProductList(fetchProduct.data);
  };

  useEffect(() => {
    getProducts();

    return () => {};
  }, []);

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>베스트 상품</StyledMenuTitle>
            <StyledMenuInfo>
              <StyledItemCount>{"총 12건"}</StyledItemCount>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList?.productResponseDTOList.map((product, index) => <Product key={index} product={product} />)}
          </StyledProductGrid>
        </StyledMain>
        <StyledSidebarDiv>
          <StyledSidebarAside>
            <StyledInfoDivFirst>
              <div style={{ width: "90%", height: "200px", background: "white", margin: "15px auto" }}></div>
              주문 시간 및<br /> 배송 안내
            </StyledInfoDivFirst>
            <StyledInfoDiv>최근 본 상품 &gt;</StyledInfoDiv>
            <StyledInfoDiv>찜한 상품 &gt;</StyledInfoDiv>
            <StyledInfoDiv>1800-0700</StyledInfoDiv>
            <StyledScrollToTop title="클릭 시 상단으로 이동" onClick={() => scrollToTop({ smooth: true })}>
              &uarr;
            </StyledScrollToTop>
          </StyledSidebarAside>
        </StyledSidebarDiv>
      </StyledListGrid>
    </Layout>
  );
};

export default PageBest;
