import { Layout, Image, ModalContainer, CartModal, RecommendProduct, ProductSidebar } from "components/mealkeat";
import React, { useEffect } from "react";
import { StyledListGrid, StyledMain, EmptyLeftDiv } from "./PageList.style";
import {
  ProductDetailContainer,
  ProductImageContainer,
  ProductDescription,
  DeliveryInfo,
  ProductFlexCol,
  StyledAmountBtn,
  ProductInfoListContainer,
  ProductAmountInput,
} from "./PageDetail.style";
import productApi from "apis/productApi";
import likeApi from "apis/likeApi";
import reviewApi from "apis/reviewApi";
import recommendApi from "apis/recommendApi";
import formatCurrency from "utils/formatCurrency";
import { useNavigate, useParams } from "react-router-dom";
import { ProductRecommendResponse } from "models/mealkeat/RecommendModels";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";
import { DEFAULT_DELIVERY_FEE, FREE_SHIPPING_THRESHOLD } from "constants/productConstants";
import cartApi from "apis/cartApi";
import { CartProduct } from "models/mealkeat/CartModels";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import { setCnt } from "feature/cartSlice";
import { setRecent } from "feature/recentProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

interface Review {
  reviewId: number;
  productId: number;
  memberNickname: number;
  reviewTitle: string;
  reviewContent: string;
  reviewImageUrl: string;
  reviewStar: string;
  modifiedAt: number;
}

interface Review {
  reviewId: number;
  productId: number;
  memberNickname: number;
  reviewTitle: string;
  reviewContent: string;
  reviewImageUrl: string;
  reviewStar: string;
  modifiedAt: number;
}

const PageDetail: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const [clickDetailView, setClickDetailView] = React.useState<boolean>(false);
  const [productDetail, setProductDetail] = React.useState<ProductResponseDTO>({} as ProductResponseDTO);
  const [detailImageList, setDetailImageList] = React.useState<string[]>([]);
  const [recommendProduct, setRecommendProduct] = React.useState<ProductRecommendResponse[]>([]);
  const [recommendWine, setRecommendWine] = React.useState<ProductResponseDTO[]>([]);
  const [likeProduct, setLikeProduct] = React.useState<number>(productDetail.isLike);
  const [purchaseCnt, setPurchaseCnt] = React.useState<number>(1);
  const [cartModal, setCartModal] = React.useState<boolean>(false);
  const [reviewList, setReviewList] = React.useState<Review[]>([]);
  const handleClickDetailViewBtn = () => {
    const detailContainer = document.getElementById("detail_image_container");
    if (detailContainer) {
      detailContainer.style.maxHeight = "none";
    }
    setClickDetailView(true);
  };

  const getProductDetail = async () => {
    const detail = await productApi.getProductDetail({ productId: id ? Number(id) : 1 });
    setProductDetail(detail.data);
    setLikeProduct(detail.data.isLike);
    const urlList: string[] = detail.data?.productDetail !== null ? detail.data?.productDetail?.split(",") : [];
    const imageList = urlList?.map(url => url?.replace(/'/g, "")?.trim());
    setDetailImageList(imageList.length > 0 ? imageList : []);

    const recentProduct = {
      src: detail.data.thumbnailImageUrl,
      title: detail.data.productName,
      productId: detail.data.productId,
    };
    dispatch(setRecent(recentProduct));
  };

  const getReviewList = async () => {
    const review = await reviewApi.getProductReviews(id ? Number(id) : 1, 1);
    if (review?.data) {
      console.log(review.data);
      setReviewList(review?.data);
    }
  };

  const getRecommendProduct = async () => {
    if (productDetail?.thumbnailImageUrl) {
      const recommend = await recommendApi.getRecommendations({
        productId: Number(id),
        productMainImage: productDetail.thumbnailImageUrl,
        productName: productDetail.productName,
      });
      setRecommendProduct(recommend.data);
    }
  };

  const getRecommendWine = async () => {
    if (productDetail?.thumbnailImageUrl) {
      const recommendWine = await recommendApi.getWineRecommendations({
        productId: Number(id),
        productMainImage: productDetail.thumbnailImageUrl,
        productName: productDetail.productName,
      });
      setRecommendWine(recommendWine.data.slice(0, 5));
    }
  };

  const toggleLike = async () => {
    if (likeProduct === 1) {
      // 현재 찜한 상태이면 찜 해제 API 호출
      await likeApi.deleteLikes(productDetail.productId);
      setLikeProduct(0);
    } else {
      // 현재 찜하지 않은 상태이면 찜하기 API 호출
      await likeApi.saveLikes(productDetail.productId);
      setLikeProduct(1);
    }
  };

  const handleClickCart = async () => {
    const res = await cartApi.saveCart({ productId: productDetail.productId, cartProductCnt: purchaseCnt });

    if (res.status === 200) {
      cartApi.getCartsCount().then(res => {
        dispatch(setCnt(res.data));
      });
      setCartModal(true);
    } else {
      console.log("장바구니 실패...!!!");
      window.alert(res.data.message);
    }
  };

  const handleClickPurchase = () => {
    const currentProduct: CartProduct = {
      ...productDetail,
      cartProductId: new Date().getTime(),
      cartProductCnt: purchaseCnt,
      selected: true,
    };
    navigate("/payment", { state: { cartList: [{ ...currentProduct }] } });
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
      getReviewList();
    }

    return () => {};
  }, [id]);

  useEffect(() => {
    if (productDetail.thumbnailImageUrl !== "" && productDetail.productName !== "") {
      if (productDetail.productType !== "wine") getRecommendProduct();
      getRecommendWine();
    }
  }, [productDetail]);

  return (
    <Layout>
      <StyledListGrid>
        <EmptyLeftDiv />
        <StyledMain>
          <ProductDetailContainer>
            <ProductImageContainer>
              <Image
                src={productDetail ? productDetail?.thumbnailImageUrl : "https://via.placeholder.com/567x567"}
                alt="이미지 대체 텍스트가 들어가야 합니다~!"
                width={567}
                height={567}
              />
            </ProductImageContainer>
            <ProductDescription>
              <ProductFlexCol $padding="0 0 2rem">
                <span className="h-[0.5rem] w-[3rem]"></span>
                <span className="text-[2rem] font-bold">{productDetail?.productName}</span>
                <div className="flex w-1/2 items-baseline gap-[2rem]">
                  {productDetail && productDetail?.stock === 0 ? (
                    <span className="text-[2rem] font-bold text-darkGrey line-through">
                      {formatCurrency({ amount: productDetail?.price, locale: "ko-KR" })}
                    </span>
                  ) : productDetail?.discountRate > 0 ? (
                    <>
                      <span className="text-[2rem] text-red">{productDetail?.discountRate}%</span>
                      <span className="text-[2rem] font-bold">
                        {formatCurrency({
                          amount: calculateDiscountPrice({
                            price: productDetail?.price,
                            discountRate: productDetail?.discountRate,
                          }),
                          locale: "ko-KR",
                        })}
                      </span>
                      <span className="text-[1rem] text-darkGrey line-through">
                        {formatCurrency({ amount: productDetail?.price, locale: "ko-KR" })}
                      </span>
                    </>
                  ) : (
                    <span className="text-[2rem] font-bold">
                      {formatCurrency({ amount: productDetail?.price, locale: "ko-KR" })}
                    </span>
                  )}
                </div>
              </ProductFlexCol>
              <ProductFlexCol $gap="1rem" $padding="1rem 0" $borderTop="1px solid #c3c6c9">
                <div className="flex items-center justify-between">
                  <div className="w-[80px]">배송정보</div>
                  <DeliveryInfo $color="#237c60">새벽배송</DeliveryInfo>
                  <div className="w-[300px]">
                    7pm 이전 결제시 <span className="font-bold text-pointSubColor">3월 16일(토) 도착 가능</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-[80px]"></div>
                  <DeliveryInfo>택배배송</DeliveryInfo>
                  <div className="w-[300px]">
                    7pm 이전 결제시 <span className="font-bold">3월 18일(월) 도착 가능</span>
                  </div>
                </div>
              </ProductFlexCol>
              <ProductFlexCol $borderTop="1px solid #c3c6c9" $padding="1rem 0" $gap="1rem">
                <ProductInfoListContainer>
                  <span>용량</span>
                  <span>{`${productDetail?.amount}${productDetail?.productType === "wine" ? "ml" : "g"}`}</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>칼로리</span>
                  <span>{productDetail?.calorie}kcal</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>보관방법</span>
                  <span>{`${productDetail?.productType === "wine" ? "서늘하고 직사광선이 없는 곳에 보관" : productDetail?.storage}`}</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>배송비</span>
                  <span>{`${formatCurrency({ amount: DEFAULT_DELIVERY_FEE })} / ${formatCurrency({ amount: FREE_SHIPPING_THRESHOLD })} 이상 무료 배송`}</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>판매자</span>
                  <span>밀킷</span>
                </ProductInfoListContainer>
              </ProductFlexCol>
              <div className="w-full py-[1rem]">
                <ProductFlexCol $gap="2rem" $padding="1rem" $border="1px solid #c3c6c9" $borderRadius="10px">
                  <div className="font-bold">{productDetail?.productName}</div>
                  <div className="flex justify-between">
                    <div className="flex items-center justify-start gap-[0.5rem]">
                      <StyledAmountBtn
                        disabled={purchaseCnt <= 1 || productDetail?.stock === 0}
                        aria-disabled={purchaseCnt <= 1 || productDetail?.stock === 0}
                        onClick={() => setPurchaseCnt(prev => prev - 1)}
                      >
                        -
                      </StyledAmountBtn>
                      <ProductAmountInput value={purchaseCnt} readOnly aria-readonly />
                      <StyledAmountBtn
                        disabled={purchaseCnt >= 10 || productDetail?.stock === 0}
                        aria-disabled={purchaseCnt >= 10 || productDetail?.stock === 0}
                        onClick={() => setPurchaseCnt(prev => prev + 1)}
                      >
                        +
                      </StyledAmountBtn>
                    </div>
                    <div>
                      {productDetail && productDetail?.stock === 0 ? (
                        <div>일시 품절</div>
                      ) : (
                        formatCurrency({
                          amount:
                            purchaseCnt *
                            calculateDiscountPrice({
                              price: productDetail?.price,
                              discountRate: productDetail?.discountRate,
                            }),
                          locale: "ko-KR",
                        })
                      )}
                    </div>
                  </div>
                </ProductFlexCol>
                <div
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  {productDetail?.stock === 0 ? (
                    <div className="text-[2rem] font-bold text-red">일시 품절</div>
                  ) : (
                    <>
                      <div>합계</div>
                      <span className="text-[2rem] font-bold text-red">
                        {formatCurrency({
                          amount:
                            purchaseCnt *
                            calculateDiscountPrice({
                              price: productDetail?.price,
                              discountRate: productDetail?.discountRate,
                            }),
                          locale: "ko-KR",
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  gap: "1rem",
                  margin: "1rem 0",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    width: "60px",
                    height: "60px",
                    // border: "1px solid #5f5f5f",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 3px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={toggleLike}
                >
                  <span
                    title="찜하기 버튼"
                    style={{
                      cursor: "pointer",
                      color: likeProduct === 1 ? "#FD6F21" : "gray",
                      fontSize: "32px",
                      padding: "0 0.25rem",
                    }}
                  >
                    ♥
                  </span>
                  <span style={{ marginTop: "0.2rem", fontWeight: "bold" }}>찜</span>
                </button>
                <button
                  style={{
                    width: "270px",
                    height: "70px",
                    background: "#237c60",
                    color: "white",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                  onClick={handleClickCart}
                  title="클릭 시 장바구니 모달이 열립니다"
                >
                  장바구니
                </button>
                <button
                  style={{
                    width: "270px",
                    height: "70px",
                    background: "#fd6f21",
                    color: "white",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                  title="클릭 시 현재 상품을 구매할 수 있는 구매 페이지로 이동"
                  onClick={handleClickPurchase}
                >
                  구매하기
                </button>
              </div>
            </ProductDescription>
          </ProductDetailContainer>

          {reviewList.length > 0 && (
            <div
              style={{
                width: "1320px",
                border: "2px solid #d0d0d0",
                margin: "auto auto 3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  margin: "1rem auto 0",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  상품의 리뷰사진
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  전체 보기
                </span>
              </div>
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  overflowX: "auto",
                  gap: "2rem",
                  padding: "1rem",
                  justifyContent: "space-between",
                  margin: "auto",
                }}
              >
                {reviewList.map((review, index) => (
                  <div
                    key={review.reviewId}
                    style={{
                      width: "180px",
                      height: "180px",
                    }}
                  >
                    <img
                      src={review.reviewImageUrl}
                      alt={`리뷰 이미지 ${index + 1}`}
                      style={{
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                      draggable="false"
                      onMouseOver={e => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", margin: "auto", width: "1320px" }}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>상품 상세 설명</span>
            <div id="detail_image_container" style={{ maxHeight: "900px", overflow: "hidden" }}>
              {detailImageList?.map(url => (
                <img
                  key={url}
                  src={url}
                  alt="대체 텍스트가 들어가야합니다~~~!!"
                  style={{ width: "640px", margin: "auto", objectFit: "contain" }}
                  draggable={false}
                />
              ))}
            </div>
            {!clickDetailView && (
              <button
                style={{
                  width: "300px",
                  border: "1px solid lightgray",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  height: "50px",
                  margin: "0 auto 3rem",
                }}
                onClick={handleClickDetailViewBtn}
              >
                상품정보 더 보기
              </button>
            )}
          </div>
          {recommendProduct.length > 0 && (
            <div
              style={{
                width: "1320px",
                margin: "60px auto",
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
                paddingBottom: "80px",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "2rem" }}>다른 고객이 함께 본 상품입니다</span>
              <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                {recommendProduct.length > 0 &&
                  recommendProduct.map((product, index) => <RecommendProduct key={index} product={product} />)}
              </div>
            </div>
          )}
          {isLoggedIn && recommendWine.length > 0 && (
            <div
              style={{
                width: "1320px",
                margin: "auto",
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid lightgray",
                padding: "60px 0",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "2rem" }}>현재 상품과 어울리는 와인입니다</span>
              <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                {recommendWine.map((product, index) => (
                  <RecommendProduct key={index} product={product} />
                ))}
              </div>
            </div>
          )}
        </StyledMain>
        <ProductSidebar />
      </StyledListGrid>
      <ModalContainer
        title="장바구니 담기"
        isOpen={cartModal}
        onClose={() => setCartModal(false)}
        width="670px"
        height="300px"
      >
        <CartModal
          onClickBtn1={() => setCartModal(false)}
          onClickBtn2={() => {
            navigate("/cart");
          }}
        />
      </ModalContainer>
    </Layout>
  );
};

export default PageDetail;
