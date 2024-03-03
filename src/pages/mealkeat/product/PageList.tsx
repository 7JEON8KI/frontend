/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface ProductSortRequest {
  productCriteria: {
    pageNum: number;
    pageAmount: number;
    sort: string;
    includeSoldOut: number;
  };
}

enum Sort {
  NEW = "NEW",
  HIGH_PRICE = "HIGH_PRICE",
  LOW_PRICE = "LOW_PRICE",
  MOST_ORDER = "MOST_ORDER",
}

const PageList: React.FC = () => {
  const [clickExcept, setClickExcept] = React.useState<boolean>(false);
  const [productList, setProductList] = React.useState<ProductResponse[]>([]);
  const [productSort, setProductSort] = React.useState<ProductSortRequest>({
    productCriteria: {
      pageNum: 1,
      pageAmount: 12,
      sort: Sort.NEW,
      includeSoldOut: 1,
    },
  });

  const handleClickExcept = () => {
    const prev = clickExcept;
    setClickExcept(prev => !prev);
    setProductSort({
      productCriteria: { ...productSort.productCriteria, includeSoldOut: prev ? 1 : 0 },
    });
  };

  const handleClickSort = (target: HTMLButtonElement) => {
    setProductSort({
      productCriteria: { ...productSort.productCriteria, sort: target.value },
    });
  };

  const getProducts = async () => {
    const axiosProduct = await productApi.getProducts({ ...productSort });
    setProductList(axiosProduct.data);
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
              <StyledItemCount>{`총 ${productList.length}건`}</StyledItemCount>
              <StyledProductInfoDivider>
                <StyledMenuButton onClick={handleClickExcept}>
                  <StyledMenuImage src={clickExcept ? exceptClick : except} alt="" />
                  <span>품절 상품제외</span>
                </StyledMenuButton>
                <StyledMenuButton
                  value={Sort.NEW}
                  onClick={e => {
                    handleClickSort(e.target as HTMLButtonElement);
                  }}
                >
                  최신상품
                </StyledMenuButton>
                <StyledMenuButton
                  value={Sort.LOW_PRICE}
                  onClick={e => {
                    handleClickSort(e.target as HTMLButtonElement);
                  }}
                >
                  낮은가격
                </StyledMenuButton>
                <StyledMenuButton
                  value={Sort.HIGH_PRICE}
                  onClick={e => {
                    handleClickSort(e.target as HTMLButtonElement);
                  }}
                >
                  높은가격
                </StyledMenuButton>
                <StyledMenuButton
                  value={Sort.MOST_ORDER}
                  onClick={e => {
                    handleClickSort(e.target as HTMLButtonElement);
                  }}
                  style={{ borderRight: "none" }}
                >
                  인기상품
                </StyledMenuButton>
              </StyledProductInfoDivider>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList.map((product, index) => (
              <Product key={index} product={product} />
            ))}
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

export default PageList;
