import React, { useEffect } from "react";
import { Layout, Product } from "components/mealkeat";
import {
  GridContainer,
  Title,
  MainDiv,
  TopSlider,
  UserRecommandSlider,
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

const PageMain: React.FC = () => {
  const navigate = useNavigate();
  const [bestProduct, setBestProduct] = React.useState<ProductResponse>();
  const [banner, setBanner] = React.useState<Banner[]>([]);

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

  const getBanners = async () => {
    const fetchBanner = await promotionApi.getBanner();
    setBanner(fetchBanner.data);
  };

  useEffect(() => {
    getBestProducts();
    getBanners();
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
                  alt="푹 쉬고 싶은 주말! 푹 끓여 먹는 국물요리 기획전 3.1 ~ 3.3"
                  title={item?.bannerTitle}
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
        <Title>저녁엔 이거 어때요?</Title>
        <UserRecommandSlider>
          <Slider {...productSettings}>
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx}>
                  <SlideImage src="https://via.placeholder.com/390x250" alt="" />
                  <SlideInfoBox>
                    <SlideContent>
                      <ProductName>[프레시지] 한끼 고기 만두국 밀키트 450g x 3봉 (총 9인분)</ProductName>
                      <ProductPrice>19,800원</ProductPrice>
                    </SlideContent>
                  </SlideInfoBox>
                </div>
              ))}
          </Slider>
        </UserRecommandSlider>
      </MainDiv>
    </Layout>
  );
};

export default PageMain;
