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
import { ProductResponse } from "models/mealkeat/ProductModels";
import { Sort } from "constants/productConstants";
import { ProductSortRequest } from "models/mealkeat/ProductModels";
import Pageination from "components/mealkeat/commons/Pageination";

const PageList: React.FC = () => {
  const [clickExcept, setClickExcept] = React.useState<boolean>(false);
  const [productList, setProductList] = React.useState<ProductResponse>();
  const [productSort, setProductSort] = React.useState<ProductSortRequest>({
    productCriteria: {
      pageNum: 1,
      pageAmount: 12,
      sort: Sort.NEW,
      includeSoldOut: 1,
    },
  });

  const handleClickPageButton = (currPage: number) => {
    setProductSort({
      productCriteria: { ...productSort.productCriteria, pageNum: currPage },
    });
  };

  const handleClickExcept = () => {
    const prev = clickExcept;
    setClickExcept(prev => !prev);
    setProductSort({
      productCriteria: { ...productSort.productCriteria, includeSoldOut: prev ? 1 : 0 },
    });
  };

  const handleClickSort = (sortValue: Sort) => {
    setProductSort({
      productCriteria: { ...productSort.productCriteria, sort: sortValue },
    });
  };

  const getProducts = async () => {
    const fetchProduct = await productApi.getProducts({ ...productSort });
    setProductList(fetchProduct.data);
  };

  useEffect(() => {
    getProducts();

    return () => {};
  }, [productSort]);

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>전체상품</StyledMenuTitle>
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
            {productList?.productResponseDTOList?.map(product => <Product key={product.productId} product={product} />)}
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
      <Pageination total={productList?.total || 0} pageAmount={12} onClickPage={handleClickPageButton} />
    </Layout>
  );
};

export default PageList;
