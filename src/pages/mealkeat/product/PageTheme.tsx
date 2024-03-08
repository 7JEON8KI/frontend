import React, { useEffect } from "react";
import { Layout, Pagination, Product, ProductSidebar } from "components/mealkeat";
import except from "assets/images/icons/except.png";
import exceptClick from "assets/images/icons/except_click.png";
import {
  StyledListGrid,
  StyledMain,
  StyledMenuNav,
  StyledMenuTitle,
  StyledMenuInfo,
  StyledMenuButton,
  StyledMenuImage,
  StyledItemCount,
  StyledProductGrid,
  StyledProductInfoDivider,
  ThemeButton,
  EmptyLeftDiv,
} from "./PageList.style";
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
  const [selectedSort, setSelectedSort] = React.useState<Sort>(Sort.NEW);
  const [themeSelected, setThemeSelected] = React.useState<ThemeName>(ThemeName.HOME);

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
    setSelectedSort(sortValue);
  };

  const handleClickTheme = (themeName: ThemeName) => {
    setProductSort({
      ...productSort,
      themeName: themeName,
    });
    setThemeSelected(themeName);
  };

  const handleClickPageButton = (currPage: number) => {
    setProductSort({ ...productSort, pageNum: currPage });
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
        <EmptyLeftDiv />
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
              <ThemeButton
                onClick={() => handleClickTheme(ThemeName.HOME)}
                $selected={themeSelected == ThemeName.HOME ? true : false}
              >
                {ThemeName.HOME}
              </ThemeButton>
              <ThemeButton
                onClick={() => handleClickTheme(ThemeName.SOLO)}
                $selected={themeSelected == ThemeName.SOLO ? true : false}
              >
                {ThemeName.SOLO}
              </ThemeButton>
              <ThemeButton
                onClick={() => handleClickTheme(ThemeName.CAMPING)}
                $selected={themeSelected == ThemeName.CAMPING ? true : false}
              >
                {ThemeName.CAMPING}
              </ThemeButton>
            </div>
            <StyledMenuInfo>
              <StyledItemCount>{`총 ${productList?.total || 0}건`}</StyledItemCount>
              <StyledProductInfoDivider>
                <StyledMenuButton onClick={handleClickExcept} aria-selected={clickExcept}>
                  <StyledMenuImage src={clickExcept ? exceptClick : except} alt="" />
                  <span style={{ fontWeight: clickExcept ? "bold" : "normal" }}>품절 상품제외</span>
                </StyledMenuButton>
                <StyledMenuButton
                  onClick={() => handleClickSort(Sort.NEW)}
                  $selected={selectedSort == Sort.NEW ? true : false}
                  aria-selected={selectedSort == Sort.NEW ? true : false}
                >
                  최신상품
                </StyledMenuButton>
                <StyledMenuButton
                  onClick={() => handleClickSort(Sort.LOW_PRICE)}
                  $selected={selectedSort == Sort.LOW_PRICE ? true : false}
                  aria-selected={selectedSort == Sort.LOW_PRICE ? true : false}
                >
                  낮은가격
                </StyledMenuButton>
                <StyledMenuButton
                  onClick={() => handleClickSort(Sort.HIGH_PRICE)}
                  $selected={selectedSort == Sort.HIGH_PRICE ? true : false}
                  aria-selected={selectedSort == Sort.HIGH_PRICE ? true : false}
                >
                  높은가격
                </StyledMenuButton>
                <StyledMenuButton
                  onClick={() => handleClickSort(Sort.MOST_ORDER)}
                  style={{ borderRight: "none" }}
                  $selected={selectedSort == Sort.MOST_ORDER ? true : false}
                  aria-selected={selectedSort == Sort.MOST_ORDER ? true : false}
                >
                  인기상품
                </StyledMenuButton>
              </StyledProductInfoDivider>
            </StyledMenuInfo>
          </StyledMenuNav>
          <StyledProductGrid>
            {productList?.productResponseDTOList?.map(product => <Product key={product.productId} product={product} />)}
          </StyledProductGrid>
          <Pagination total={productList?.total || 0} pageAmount={12} onClickPage={handleClickPageButton} />
        </StyledMain>
        <ProductSidebar />
      </StyledListGrid>
    </Layout>
  );
};

export default PageTheme;
