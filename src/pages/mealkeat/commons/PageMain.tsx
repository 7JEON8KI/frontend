import React, { useEffect } from "react";
import { Layout, Product, ModalContainer } from "components/mealkeat";
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
  ModalIngBtnWant,
  ModalIngBtnWont,
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
import { RootState } from "store";
import { useSelector } from "react-redux";

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

const want = [
  {
    id: "btn1",
    name: "소고기",
  },
  {
    id: "btn2",
    name: "돼지고기",
  },
  {
    id: "btn3",
    name: "닭고기",
  },
  {
    id: "btn4",
    name: "생선/해물",
  },
  {
    id: "btn5",
    name: "콩/두부",
  },
  {
    id: "btn6",
    name: "나물/해초",
  },
  {
    id: "btn7",
    name: "마라",
  },
];

const wont = [
  {
    id: "wontbtn1",
    name: "대두",
  },
  {
    id: "wontbtn2",
    name: "땅콩",
  },
  {
    id: "wontbtn3",
    name: "호두",
  },
  {
    id: "wontbtn4",
    name: "잣",
  },
  {
    id: "wontbtn5",
    name: "밀",
  },
  {
    id: "wontbtn6",
    name: "메밀",
  },
  {
    id: "wontbtn7",
    name: "우유",
  },
  {
    id: "wontbtn8",
    name: "복숭아",
  },
  {
    id: "wontbtn9",
    name: "토마토",
  },
  {
    id: "wontbtn10",
    name: "고등어",
  },
  {
    id: "wontbtn11",
    name: "오징어",
  },
  {
    id: "wontbtn12",
    name: "새우",
  },
];

const PageMain: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [bestProduct, setBestProduct] = React.useState<ProductResponse>();
  const [banner, setBanner] = React.useState<Banner[]>([]);
  const [userRecommend, setUserRecommend] = React.useState<UserRecommend[]>([]);
  const [mealModal, setMealModal] = React.useState<boolean>(isLoggedIn ? true : false);
  const [showIngredientModal, setShowIngredientModal] = React.useState<boolean>(false);

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

  useEffect(() => {
    const modalShown = localStorage.getItem("modalOnce");

    if (!modalShown) {
      setMealModal(isLoggedIn ? true : false);

      if (isLoggedIn) {
        localStorage.setItem("modalOnce", "true");
      }
    }
  }, [isLoggedIn]);

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
      <ModalContainer
        title="밀킷 맞춤 추천"
        isOpen={mealModal}
        onClose={() => setMealModal(false)}
        width={showIngredientModal ? "1000px" : "670px"}
        height={showIngredientModal ? "500px" : "300px"}
      >
        {showIngredientModal ? (
          <div
            style={{
              height: "400px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "80%",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>선호하는 재료가 있으신가요?</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {want.map((item, index) => (
                <ModalIngBtnWant key={index}>
                  <input type="checkbox" id={item.id} hidden />
                  <label htmlFor={item.id} className="checkbox-label">
                    {item.name}
                  </label>
                </ModalIngBtnWant>
              ))}
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>빼고 싶은 재료가 있으신가요?</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {wont.map((item, index) => (
                <ModalIngBtnWont key={index}>
                  <input type="checkbox" id={item.id} hidden />
                  <label htmlFor={item.id} className="checkbox-label">
                    {item.name}
                  </label>
                </ModalIngBtnWont>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                type="button"
                style={{ width: "150px", padding: "1rem 2rem", fontWeight: "bold", border: "1px solid #d0d0d0" }}
                onClick={() => {
                  setMealModal(false);
                  setShowIngredientModal(false);
                }}
              >
                취소
              </button>
              <button
                type="button"
                style={{ width: "150px", background: "#fd6f21", color: "white", padding: "1rem 2rem" }}
                onClick={() => {
                  setMealModal(false);
                  setShowIngredientModal(false);
                }}
              >
                선택완료
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "250px",
              margin: "auto",
              gap: "3rem",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>
              <span style={{ color: "#fd6f21" }}>밀킷</span> 맞춤 추천을 받으시겠습니까?
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                style={{ width: "150px", background: "#fd6f21", color: "white", padding: "1rem 2rem" }}
                onClick={() => setShowIngredientModal(true)}
              >
                예
              </button>
              <button
                type="button"
                style={{ width: "150px", padding: "1rem 2rem", background: "#d0d0d0" }}
                onClick={() => setMealModal(false)}
              >
                아니오
              </button>
            </div>
          </div>
        )}
      </ModalContainer>
    </Layout>
  );
};

export default PageMain;
