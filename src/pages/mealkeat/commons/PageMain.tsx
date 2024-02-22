import React from "react";
import { Layout } from "components/mealkeat";
import {
  StyledContentPrice,
  StyledContentText,
  StyledGridContainer,
  StyledProduct,
  StyledTitle,
  StyledMainDiv,
  StyledTopSlider,
} from "./PageMain.style";
import Slider from "react-slick";

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
  const gridRef = React.useRef<HTMLDivElement>(null);
  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const [itemRect, setItemRect] = React.useState<number | null>(null);
  const products = Array(12)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/400x400",
      title: `${idx + 1}.[새벽시장] 맛있는 명인 손만두, 최대 한줄까지 작성 가능합니다.`,
      description:
        "내용입니다. 최대 한줄까지~~!! 한줄까지~~!! 한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    }));

  React.useEffect(() => {
    if (gridRef.current && firstItemRef.current) {
      const newItemRect =
        gridRef.current.getBoundingClientRect().width >= 2100 ? 116.25 : firstItemRef.current.getBoundingClientRect().x;
      setItemRect(newItemRect);
    }
  }, [firstItemRef]);

  const sliderItem = Array(4)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/1200x400",
      alt: `${idx}`,
    }));

  return (
    <Layout>
      <StyledMainDiv>
        <StyledTopSlider id="here">
          <Slider {...settings}>
            {sliderItem.map((item, index) => (
              <div key={index} className="sliderItem">
                {/* <h3>{index + 1}</h3> */}
                <img src={item.imageUrl} alt={item.alt} />
              </div>
            ))}
          </Slider>
        </StyledTopSlider>
        <StyledTitle $paddingLeft={itemRect || 0}>Best Meal</StyledTitle>
        <StyledGridContainer ref={gridRef}>
          {products.map((product, index) => (
            <StyledProduct key={index} ref={index == 0 ? firstItemRef : null}>
              <img className="food_img" src={product.imageUrl} alt="" />
              <div className="content">
                <StyledContentText $title={true}>{product.title}</StyledContentText>
                <StyledContentText $description={true}>{product.description}</StyledContentText>
                <StyledContentPrice>
                  <div>{product.discount}</div>
                  <div>{product.price}</div>
                  <div>{product.originalPrice}</div>
                  <img className="cart_btn" src="https://via.placeholder.com/50x50" alt="" />
                </StyledContentPrice>
                {product.soldOut && <div>일시 품절</div>}
              </div>
            </StyledProduct>
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
        >
          더 많은 상품 보러가기
        </button>
        <StyledTitle $paddingLeft={itemRect || 0}>저녁엔 이거 어때요?</StyledTitle>
        <div style={{ width: "1600px", height: "500px", margin: "50px auto" }}>
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
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    }}
                  />
                  <div
                    style={{
                      width: "390px",
                      height: "120px",
                      margin: "0 auto 15px",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
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
