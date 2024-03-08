import React, { useEffect } from "react";
import { Layout, Pagination, Product, ProductSidebar } from "components/mealkeat";
import {
  StyledListGrid,
  StyledMain,
  StyledMenuNav,
  StyledMenuTitle,
  StyledMenuInfo,
  StyledItemCount,
  StyledProductGrid,
  EmptyLeftDiv,
} from "./PageList.style";
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
        <EmptyLeftDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>베스트 상품</StyledMenuTitle>
            <StyledMenuInfo>
              <StyledItemCount>{"총 12건"}</StyledItemCount>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList?.productResponseDTOList.map(product => <Product key={product.productId} product={product} />)}
          </StyledProductGrid>
          <Pagination total={12} pageAmount={12} onClickPage={() => {}} />
        </StyledMain>
        <ProductSidebar />
      </StyledListGrid>
    </Layout>
  );
};

export default PageBest;
