import React, { useEffect } from "react";
import { Layout, Product, NoProduct } from "components/mealkeat";
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
import { ProductRecommendResponse } from "models/mealkeat/RecommendModels";

const PageSearchResult: React.FC = () => {
  const location = useLocation();
  const searchWord = location?.state?.searchWord || "";
  const imageProduct = location?.state?.imageProduct || [];
  const [productList, setProductList] = React.useState<ProductResponseDTO[]>([]);

  const initRequest = {
    searchRequestDTO: {
      keyword: searchWord,
    },
  };

  const createProductObject = async (object: ProductRecommendResponse[]): Promise<ProductResponseDTO[]> => {
    return object?.map(
      obj =>
        ({
          amount: 1,
          calorie: 0,
          createdAt: [],
          discountRate: obj.discountRate,
          isLike: 0,
          modifiedAt: [],
          price: obj.price,
          productDetail: "",
          productId: obj.productId,
          productName: obj.productName,
          productSubName: "",
          productType: obj.productType,
          rn: 0,
          stock: 1,
          storage: "",
          themeName: null,
          thumbnailImageUrl: obj.mainImgUrl,
        }) as unknown,
    ) as ProductResponseDTO[];
  };

  const getSearchProduct = async () => {
    const fetchData = await productApi.getProductsWithSearch({ ...initRequest });
    setProductList(fetchData.data as ProductResponseDTO[]);
  };

  useEffect(() => {
    if (imageProduct.length > 0) {
      createProductObject(imageProduct).then(productObj => setProductList(productObj));
    } else getSearchProduct();
    return () => {};
  }, [location?.key]);

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuNav>
            <StyledMenuTitle>
              {imageProduct.length > 0 ? "이미지로 검색한 결과입니다" : `'${searchWord}'에 대한 검색 결과입니다`}
            </StyledMenuTitle>
            <StyledMenuInfo>
              <StyledItemCount>{`총 ${productList?.length || 0}건`}</StyledItemCount>
            </StyledMenuInfo>
          </StyledMenuNav>
          {productList.length > 0 ? (
            <StyledProductGrid>
              {productList?.map(product => <Product key={product.productId} product={product} />)}
            </StyledProductGrid>
          ) : (
            <NoProduct />
          )}
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
