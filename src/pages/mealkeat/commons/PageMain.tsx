import React, { useEffect } from "react";
import { Layout, Product } from "components/mealkeat";
import { StyledGridContainer, StyledTitle, StyledMainDiv, StyledTopSlider } from "./PageMain.style";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";
import { Sort } from "constants/productConstants";
import { ProductResponse, ProductSortRequest } from "models/mealkeat/ProductModels";
import productApi from "apis/productApi";

const settings = {
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

const PageMain: React.FC = () => {
  const navigate = useNavigate();
  const [bestProduct, setBestProduct] = React.useState<ProductResponse[]>([]);

  const getBestProducts = async () => {
    const fetchProduct = await productApi.getProducts({
      productCriteria: {
        pageNum: 1,
        pageAmount: 4,
        sort: Sort.MOST_ORDER, // 많이 팔린 순
        includeSoldOut: 1, // 품절 제외
      },
    } as ProductSortRequest);
    setBestProduct(fetchProduct.data);
  };

  const sliderItem = Array(4)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/1200x400",
      alt: `${idx}`,
    }));

  useEffect(() => {
    getBestProducts();
  }, []);

  return (
    <Layout>
      <StyledMainDiv>
        <StyledTopSlider>
          <Slider {...settings}>
            {sliderItem.map((item, index) => (
              <div key={index} className="sliderItem">
                <img src={item.imageUrl} alt={item.alt} />
              </div>
            ))}
          </Slider>
        </StyledTopSlider>
        <StyledTitle>밀킷 베스트 상품입니다</StyledTitle>
        <StyledGridContainer>
          {bestProduct.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </StyledGridContainer>
        <button
          type="button"
          style={{
            width: "245px",
            height: "48px",
            border: "solid 1px #FD6F21",
            padding: "12px 50px",
            margin: "34px auto",
            display: "block",
            color: "#FD6F21",
            fontWeight: "bold",
          }}
          onClick={() => {
            scrollToTop({});
            navigate("/best");
          }}
        >
          더 많은 상품 보러가기
        </button>
        <StyledTitle>저녁엔 이거 어때요?</StyledTitle>
        <div style={{ width: "1600px", height: "500px", margin: "0px auto" }}>
          <Slider dots={true} arrows={true} slidesToShow={3} slidesToScroll={3} speed={1500} infinite={true}>
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx}>
                  <img
                    src="https://via.placeholder.com/390x250"
                    alt=""
                    style={{
                      width: "390px",
                      height: "250px",
                      display: "block",
                      margin: "15px auto 0",
                      boxShadow: "rgba(0, 0, 0, 0.15) -5px -2px 12px, rgba(0, 0, 0, 0.15) 5px -2px 12px",
                    }}
                  />
                  <div
                    style={{
                      width: "390px",
                      height: "120px",
                      margin: "0 auto 15px",
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <p style={{ fontWeight: "bold", width: "100%" }}>
                        [프레시지] 한끼 고기 만두국 밀키트 450g x 3봉 (총 9인분)
                      </p>
                      <p style={{ color: "#898989", fontSize: "14px", width: "100%" }}>19,800원</p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </StyledMainDiv>
    </Layout>
  );
};

export default PageMain;
