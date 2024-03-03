import React, { useEffect } from "react";
import { Layout, Product } from "components/mealkeat";
import except from "assets/images/icons/except.png";
import exceptClick from "assets/images/icons/except_click.png";
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
  StyledMenuButton,
  StyledMenuImage,
  StyledItemCount,
  StyledProductGrid,
  StyledProductInfoDivider,
} from "./PageList.style";
import scrollToTop from "utils/scrollToTop";
import productApi from "apis/productApi";
import { Sort, ThemeName } from "constants/productConstants";
import { ProductResponse, ProductThemeRequest } from "models/mealkeat/ProductModels";

const PageTheme: React.FC = () => {
  const [clickExcept, setClickExcept] = React.useState<boolean>(false);
  const [productList, setProductList] = React.useState<ProductResponse>();
  const [productSort, setProductSort] = React.useState<ProductThemeRequest>({
    pageNum: 1,
    pageAmount: 12,
    sort: Sort.NEW,
    includeSoldOut: 1,
    themeName: ThemeName.HOME,
  });

  const handleClickExcept = () => {
    const prev = clickExcept;
    setClickExcept(prev => !prev);
    setProductSort({
      ...productSort,
      includeSoldOut: prev ? 1 : 0,
    });
  };

  const handleClickSort = (sortValue: Sort) => {
    setProductSort({
      ...productSort,
      sort: sortValue,
    });
  };

  const handleClickTheme = (themeName: ThemeName) => {
    setProductSort({
      ...productSort,
      themeName: themeName,
    });
  };

  const getThemeProducts = async () => {
    const fetchProduct = await productApi.getThemeProducts({ ...productSort });
    setProductList(fetchProduct.data);
  };

  useEffect(() => {
    getThemeProducts();

    return () => {};
  }, [productSort]);
  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>테마별</StyledMenuTitle>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <button
                style={{
                  width: "100px",
                  height: "50px",
                  padding: "1rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                type="button"
                onClick={() => handleClickTheme(ThemeName.HOME)}
              >
                {ThemeName.HOME}
              </button>
              <button
                style={{
                  width: "100px",
                  height: "50px",
                  padding: "1rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                type="button"
                onClick={() => handleClickTheme(ThemeName.SOLO)}
              >
                {ThemeName.SOLO}
              </button>
              <button
                style={{
                  width: "100px",
                  height: "50px",
                  padding: "1rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                type="button"
                onClick={() => handleClickTheme(ThemeName.CAMPING)}
              >
                {ThemeName.CAMPING}
              </button>
            </div>
            <StyledMenuInfo>
              <StyledItemCount>{`총 ${productList?.total || 0}건`}</StyledItemCount>
              <StyledProductInfoDivider>
                <StyledMenuButton onClick={handleClickExcept}>
                  <StyledMenuImage src={clickExcept ? exceptClick : except} alt="" />
                  <span>품절 상품제외</span>
                </StyledMenuButton>
                <StyledMenuButton onClick={() => handleClickSort(Sort.NEW)}>최신상품</StyledMenuButton>
                <StyledMenuButton onClick={() => handleClickSort(Sort.LOW_PRICE)}>낮은가격</StyledMenuButton>
                <StyledMenuButton onClick={() => handleClickSort(Sort.HIGH_PRICE)}>높은가격</StyledMenuButton>
                <StyledMenuButton onClick={() => handleClickSort(Sort.MOST_ORDER)} style={{ borderRight: "none" }}>
                  인기상품
                </StyledMenuButton>
              </StyledProductInfoDivider>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList?.productResponseDTOList?.map((product, index) => <Product key={index} product={product} />)}
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

export default PageTheme;
