import React, { useEffect } from "react";
import { Layout, Product, NoProduct, ProductSidebar } from "components/mealkeat";
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
        <EmptyLeftDiv />
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
        <ProductSidebar />
      </StyledListGrid>
    </Layout>
  );
};

export default PageSearchResult;
