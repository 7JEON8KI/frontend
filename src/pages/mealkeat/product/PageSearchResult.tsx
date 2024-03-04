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
import { useLocation } from "react-router-dom";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";

const PageSearchResult: React.FC = () => {
  const location = useLocation();

  const searchWord = location?.state?.searchWord || "";
  const [productList, setProductList] = React.useState<ProductResponseDTO[]>([]);

  const initRequest = {
    searchRequestDTO: {
      keyword: searchWord,
    },
  };

  const getSearchProduct = async () => {
    const fetchData = await productApi.getProductsWithSearch({ ...initRequest });
    setProductList(fetchData.data);
  };

  useEffect(() => {
    return () => {
      getSearchProduct();
    };
  }, []);

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>{`'${searchWord}'에 대한 검색 결과입니다`}</StyledMenuTitle>
            <StyledMenuInfo>
              <StyledItemCount>{`총 ${productList?.length || 0}건`}</StyledItemCount>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList?.map((product, index) => <Product key={index} product={product} />)}
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

export default PageSearchResult;
