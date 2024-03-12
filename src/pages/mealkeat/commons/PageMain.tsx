import React, { useEffect } from "react";
import { Layout, Product } from "components/mealkeat";
import {
  GridContainer,
  Title,
  MainDiv,
  TopSlider,
  UserRecommendSlider,
  SlideImage,
  ProductName,
  ProductPrice,
  SlideContent,
  SlideInfoBox,
  MoreProductsButton,
} from "./PageMain.style";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";
import { Sort } from "constants/productConstants";
import { ProductResponse, ProductSortRequest } from "models/mealkeat/ProductModels";
import productApi from "apis/productApi";
import promotionApi from "apis/promotionApi";
import recommendApi from "apis/recommendApi";
import formatCurrency from "utils/formatCurrency";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import { ThemeName } from "constants/productConstants";

interface Banner {
  bannerId: number;
  bannerTitle: string;
  bannerImageUrl: string;
  bannerStartDay: number[];
  bannerEndDay: number[];
  createAt: number[];
  modifiedAt: number[];
  deletedAt: number[] | null;
}
const bannerSettings = {
  dots: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  centerMode: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1500,
};

const productSettings = {
  dots: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 1500,
  infinite: true,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 1000,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
      },
    },
  ],
};

interface RecommendProduct {
  productId: string;
  productName: string;
  price: number;
  productType: string;
  discountRate: number;
  mainImgUrl: string;
}
interface UserRecommend {
  ment: string;
  products: RecommendProduct[];
}

const PageMain: React.FC = () => {
  const navigate = useNavigate();
  const [bestProduct, setBestProduct] = React.useState<ProductResponse>();
  const [banner, setBanner] = React.useState<Banner[]>([]);
  const [userRecommend, setUserRecommend] = React.useState<UserRecommend[]>([]);

  const getBestProducts = async () => {
    const fetchProduct = await productApi.getProducts({
      productCriteria: {
        pageNum: 1,
        pageAmount: 12,
        sort: Sort.MOST_ORDER, // 많이 팔린 순
        includeSoldOut: 1, // 품절 제외
      },
    } as ProductSortRequest);
    setBestProduct(fetchProduct.data);
  };

  const getUserRecommend = async () => {
    const fetchUserRecommend = await recommendApi.getMainRecommendations();
    setUserRecommend(fetchUserRecommend.data);
  };

  const getBanners = async () => {
    const fetchBanner = await promotionApi.getBanner();
    setBanner(fetchBanner.data);
  };

  useEffect(() => {
    getBestProducts();
    getBanners();
    getUserRecommend();
  }, []);

  return (
    <Layout>
      <MainDiv>
        <TopSlider>
          <Slider {...bannerSettings}>
            {banner.map((item, index) => (
              <div key={index} className="sliderItem">
                <img
                  src={item?.bannerImageUrl}
                  style={{ cursor: "pointer" }}
                  alt="푹 쉬고 싶은 주말! 푹 끓여 먹는 국물요리 기획전 3.1 ~ 3.3"
                  title={item?.bannerTitle}
                  draggable={false}
                  onClick={() => {
                    scrollToTop({});
                    navigate("/theme", {
                      state: { themeName: item?.bannerTitle == "캠핑" ? ThemeName.CAMPING : ThemeName.HOME },
                    });
                  }}
                />
              </div>
            ))}
          </Slider>
        </TopSlider>
        <Title>밀킷 베스트 상품입니다</Title>
        <GridContainer>
          {bestProduct?.productResponseDTOList
            .slice(0, 4) // 메인에 4개만 보여줌
            .map((product, index) => <Product key={index} product={product} />)}
        </GridContainer>
        <MoreProductsButton
          onClick={() => {
            scrollToTop({});
            navigate("/best");
          }}
        >
          더 많은 상품 보러가기
        </MoreProductsButton>
        <Title>{userRecommend.length > 0 && userRecommend[0]?.ment}</Title>
        <UserRecommendSlider>
          <Slider {...productSettings}>
            {userRecommend.length > 0 &&
              userRecommend[0].products?.map(product => (
                <div
                  key={product.productId}
                  onClick={() => {
                    scrollToTop({});
                    navigate(`/detail/${product.productId}`);
                  }}
                  title="클릭 시 해당 상품 페이지로 이동"
                >
                  <SlideImage src={product.mainImgUrl} alt={product.productName} draggable={false} />
                  <SlideInfoBox>
                    <SlideContent>
                      <ProductName>{product.productName}</ProductName>
                      {product.discountRate > 0 ? (
                        <>
                          <ProductPrice>
                            {formatCurrency({
                              amount: calculateDiscountPrice({
                                price: product.price,
                                discountRate: product.discountRate,
                              }),
                              locale: "ko-KR",
                            })}
                          </ProductPrice>
                          <p style={{ color: "#898989", textDecoration: "line-through" }}>
                            {formatCurrency({ amount: product.price, locale: "ko-KR" })}
                          </p>
                        </>
                      ) : (
                        <p style={{ color: "black", fontWeight: "bold", fontSize: "1.25rem", width: "100%" }}>
                          {formatCurrency({
                            amount: product.price,
                            locale: "ko-KR",
                          })}
                        </p>
                      )}
                    </SlideContent>
                  </SlideInfoBox>
                </div>
              ))}
          </Slider>
        </UserRecommendSlider>
      </MainDiv>
    </Layout>
  );
};

export default PageMain;
