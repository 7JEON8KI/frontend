import { Layout, Image, ModalContainer, CartModal, RecommandProduct } from "components/mealkeat";
import React, { useEffect } from "react";
import {
  StyledListGrid,
  StyledSidebarDiv,
  StyledMain,
  StyledSidebarAside,
  StyledInfoDivFirst,
  StyledInfoDiv,
  StyledScrollToTop,
} from "./PageList.style";
import {
  ProductDetailContainer,
  ProductImageContainer,
  ProductDescription,
  DeliveryInfo,
  ProductFlexCol,
  StyledAmountBtn,
  ProductInfoListContainer,
  ProductAmountInput,
  ProductMiniImage,
} from "./PageDetail.style";
import scrollToTop from "utils/scrollToTop";
import HeartPath from "assets/images/icons/Heart.png";
import productApi from "apis/productApi";
import recommandApi from "apis/recommandApi";
import formatCurrency from "utils/formatCurrency";
import { useParams } from "react-router-dom";
import { ProductRecommandResponse } from "models/mealkeat/RecommandModels";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";

const PageDetail: React.FC = () => {
  const { id } = useParams();
  const [clickDetailView, setClickDetailView] = React.useState<boolean>(false);
  const [productDetail, setProductDetail] = React.useState<ProductResponseDTO>({} as ProductResponseDTO);
  const [recommandProduct, setRecommandProduct] = React.useState<ProductRecommandResponse[]>([]);
  const [recommandWine, setRecommandWine] = React.useState<ProductResponseDTO[]>([]);

  const [purchaseCnt, setPurchaseCnt] = React.useState<number>(1);
  const [cartModal, setCartModal] = React.useState<boolean>(false);
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
  };

  const getRecommandProduct = async () => {
    const recommand = await recommandApi.getRecommendations({
      productId: Number(id),
      productMainImage: productDetail.thumbnailImageUrl,
      productName: productDetail.productName,
    });
    setRecommandProduct(recommand.data);
  };

  const getRecommandWine = async () => {
    const recommandWine = await recommandApi.getWineRecommendations({
      productId: Number(id),
      productMainImage: productDetail.thumbnailImageUrl,
      productName: productDetail.productName,
    });
    setRecommandWine(recommandWine.data.slice(0, 5));
  };

  useEffect(() => {
    getProductDetail();

    return () => {};
  }, []);

  useEffect(() => {
    if (productDetail.thumbnailImageUrl !== "" && productDetail.productName !== "") {
      getRecommandProduct();
      getRecommandWine();
    }
  }, [productDetail]);
  // "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b0ea42d5-d8ff-11ee-8ed0-ac198ebc401d.jpg',
  //  'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b12e5516-d8ff-11ee-97a6-ac198ebc401d.jpg',
  //   'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b158048e-d8ff-11ee-aea2-ac198ebc401d.jpg',
  //    'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b1e6e08a-d8ff-11ee-bf35-ac198ebc401d.jpg',
  //     'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b235ee19-d8ff-11ee-9774-ac198ebc401d.jpg',
  //      'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b2808466-d8ff-11ee-be8d-ac198ebc401d.jpg',
  //       'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/3_b2cec175-d8ff-11ee-b38e-ac198ebc401d.jpg'"

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <ProductDetailContainer>
            <ProductImageContainer>
              <Image
                src={productDetail ? productDetail?.thumbnailImageUrl : "https://via.placeholder.com/567x567"}
                alt="이미지 대체 텍스트가 들어가야 합니다~!"
                width={567}
                height={567}
              />
              <ProductMiniImage>
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
                <Image
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  width={98}
                  height={98}
                />
              </ProductMiniImage>
            </ProductImageContainer>
            <ProductDescription>
              <ProductFlexCol $padding="0 0 2rem">
                <span className="h-[0.5rem] w-[3rem]"></span>
                <span className="text-[2rem] font-bold">{productDetail?.productName}</span>
                <div className="flex w-1/2 items-baseline gap-[2rem]">
                  {productDetail && productDetail?.discountRate > 0 ? (
                    <>
                      <span className="text-[2rem] text-red">{productDetail?.discountRate}%</span>
                      <span className="text-[2rem] font-bold">5,700원</span>
                      <span className="text-[1rem] text-darkGrey line-through">
                        {formatCurrency({ amount: productDetail?.price, locale: "ko-KR" })}원
                      </span>
                    </>
                  ) : (
                    <span className="text-[2rem] font-bold">
                      {formatCurrency({ amount: productDetail?.price, locale: "ko-KR" })}원
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
                  <span>{productDetail?.amount}g</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>칼로리</span>
                  <span>{productDetail?.calorie}kcal</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>보관방법</span>
                  <span>{productDetail?.storage}</span>
                </ProductInfoListContainer>
                <ProductInfoListContainer>
                  <span>배송비</span>
                  <span>3,000원 / 40,000원 이상 무료 배송</span>
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
                        disabled={purchaseCnt <= 1}
                        aria-disabled={purchaseCnt <= 1}
                        onClick={() => setPurchaseCnt(prev => prev - 1)}
                      >
                        -
                      </StyledAmountBtn>
                      <ProductAmountInput value={purchaseCnt} readOnly aria-readonly />
                      <StyledAmountBtn
                        disabled={purchaseCnt >= 10}
                        aria-disabled={purchaseCnt >= 10}
                        onClick={() => setPurchaseCnt(prev => prev + 1)}
                      >
                        +
                      </StyledAmountBtn>
                    </div>
                    <div>
                      {productDetail && formatCurrency({ amount: purchaseCnt * productDetail?.price, locale: "ko-KR" })}
                      원
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
                  합계
                  <span className="text-[2rem] font-bold text-red">
                    {productDetail && formatCurrency({ amount: purchaseCnt * productDetail?.price, locale: "ko-KR" })}원
                  </span>
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
                    border: "1px solid #5f5f5f",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={HeartPath} style={{ width: "30px", height: "30px" }} alt="찜 아이콘" />
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
                  onClick={() => setCartModal(true)}
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
                >
                  구매하기
                </button>
              </div>
            </ProductDescription>
          </ProductDetailContainer>
          <div style={{ width: "1320px", height: "250px", border: "1px solid black", margin: "40px auto" }}>리뷰</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>상품 상세 설명</span>
            <div id="detail_image_container" style={{ maxHeight: "900px", overflow: "hidden" }}>
              <img
                src="https://via.placeholder.com/640x2770"
                alt="대체 텍스트가 들어가야합니다~~~!!"
                style={{ width: "640px", height: "2770px", margin: "auto" }}
              />
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
          {recommandProduct.length > 0 && (
            <div
              style={{
                width: "1320px",
                margin: "60px auto",
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
                paddingBottom: "80px",
                borderBottom: "1px solid lightgray",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "2rem" }}>다른 고객이 함께 본 상품입니다</span>
              <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                {recommandProduct.length > 0 &&
                  recommandProduct.map((product, index) => <RecommandProduct key={index} product={product} />)}
              </div>
            </div>
          )}
          {recommandWine.length > 0 && (
            <div
              style={{
                width: "1320px",
                margin: "60px auto",
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "2rem" }}>현재 상품과 어울리는 와인입니다</span>
              <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                {recommandWine.map((product, index) => (
                  <RecommandProduct key={index} product={product} />
                ))}
              </div>
            </div>
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
      <ModalContainer
        title="장바구니 담기"
        isOpen={cartModal}
        onClose={() => setCartModal(false)}
        width="670px"
        height="300px"
      >
        <CartModal onClickBtn1={() => setCartModal(false)} onClickBtn2={() => {}} />
      </ModalContainer>
    </Layout>
  );
};

export default PageDetail;
