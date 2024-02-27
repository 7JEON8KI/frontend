import { Layout, Product } from "components/mealkeat";
import React from "react";
import {
  StyledListGrid,
  StyledSidebarDiv,
  StyledMain,
  StyledSidebarAside,
  StyledInfoDivFirst,
  StyledInfoDiv,
  StyledScrollToTop,
} from "./PageList.style";
import scrollToTop from "utils/scrollToTop";
import HeartPath from "assets/images/icons/Heart.png";
import styled from "styled-components";
const StyledAmountBtn = styled.button.attrs({ type: "button" })`
  width: 40px;
  height: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #237c60;
  color: white;
  &:disabled {
    background-color: #d0d0d0;
    color: black;
  }
`;

const PageDetail: React.FC = () => {
  const [clickDetailView, setClickDetailView] = React.useState<boolean>(false);
  const [productCnt, setProductCnt] = React.useState<number>(1);
  const handleClickDetailViewBtn = () => {
    const detailContainer = document.getElementById("detail_image_container");
    if (detailContainer) {
      detailContainer.style.maxHeight = "none";
    }
    setClickDetailView(true);
  };
  const products = Array(5)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/200x200",
      title: `${idx + 1}.[새벽시장] 맛있는 명인 손만두, 최대 한줄까지 작성 가능합니다.최대 한줄까지 작성 가능합니다.최대 한줄까지 작성 가능합니다.최대 한줄까지 작성 가능합니다.최대 한줄까지 작성 가능합니다.최대 한줄까지 작성 가능합니다.`,
      description:
        "내용입니다. 최대 한줄까지~~!! 한줄까지~~!! 한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    }));
  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <div
            style={{
              width: "1320px",
              display: "flex",
              margin: "60px auto",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                margin: "0.5rem",
                justifyContent: "start",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <img
                src="https://via.placeholder.com/567x567"
                alt="이미지 대체 텍스트가 들어가야 합니다~!"
                style={{ width: "567px", height: "567px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <img
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  style={{ width: "98px", height: "98px" }}
                />
                <img
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  style={{ width: "98px", height: "98px" }}
                />
                <img
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  style={{ width: "98px", height: "98px" }}
                />
                <img
                  src="https://via.placeholder.com/98x98"
                  alt="이미지 대체 텍스트가 들어가야 합니다~!"
                  style={{ width: "98px", height: "98px" }}
                />
              </div>
            </div>
            <div
              style={{
                width: "670px",
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "space-around",
                  padding: "0  0 2rem",
                }}
              >
                <span style={{ fontSize: "1rem", color: "#5f5f5f" }}>부드러운 달콤함을 품은</span>
                <span style={{ fontSize: "2rem", fontWeight: "bold" }}>단호박죽</span>
                <div style={{ display: "flex", gap: "2rem", width: "50%", alignItems: "baseline" }}>
                  <span style={{ fontSize: "2rem", color: "red" }}>5%</span>
                  <span style={{ fontSize: "2rem", fontWeight: "bold" }}>5,700원</span>
                  <span style={{ fontSize: "1rem", color: "#5f5f5f", textDecorationLine: "line-through" }}>
                    6,000원
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  // justifyContent: "end",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "1rem 0",
                  borderTop: "1px solid #c3c6c9",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: "80px" }}>배송정보</div>
                  <div
                    style={{
                      width: "130px",
                      height: "40px",
                      border: "2px solid #237c60",
                      color: "#237c60",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50px",
                    }}
                  >
                    새벽배송
                  </div>
                  <div style={{ width: "300px" }}>
                    7pm 이전 결제시 <span style={{ color: "#237c60", fontWeight: "bold" }}>2월 8일(목) 도착 가능</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: "80px" }}></div>
                  <div
                    style={{
                      width: "130px",
                      height: "40px",
                      border: "2px solid black",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50px",
                    }}
                  >
                    택배배송
                  </div>
                  <div style={{ width: "300px" }}>
                    7pm 이전 결제시 <span style={{ fontWeight: "bold" }}>2월 13일(화) 도착 가능</span>
                  </div>
                </div>
                {/* <div style={{ color: "#5f5f5f" }}>주문시간 및 배송안내 자세히보기 &gt;</div> */}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem 0",
                  gap: "1rem",
                  borderTop: "1px solid #c3c6c9",
                }}
              >
                <div style={{ display: "grid", gap: "5rem", justifyContent: "start", gridTemplateColumns: "1fr 5fr" }}>
                  <span style={{ fontWeight: "bold" }}>용량</span>
                  <span>330g</span>
                </div>
                <div style={{ display: "grid", gap: "5rem", justifyContent: "start", gridTemplateColumns: "1fr 5fr" }}>
                  <span style={{ fontWeight: "bold" }}>칼로리</span>
                  <span>320kcal</span>
                </div>
                <div style={{ display: "grid", gap: "5rem", justifyContent: "start", gridTemplateColumns: "1fr 5fr" }}>
                  <span style={{ fontWeight: "bold" }}>보관방법</span>
                  <span>냉동</span>
                </div>
                <div style={{ display: "grid", gap: "5rem", justifyContent: "start", gridTemplateColumns: "1fr 5fr" }}>
                  <span style={{ fontWeight: "bold" }}>배송비</span>
                  <span>3,000원 / 40,000원 이상 무료 배송</span>
                </div>
                <div style={{ display: "grid", gap: "5rem", justifyContent: "start", gridTemplateColumns: "1fr 5fr" }}>
                  <span style={{ fontWeight: "bold" }}>판매자</span>
                  <span>그리팅</span>
                </div>
              </div>
              <div style={{ width: "100%", padding: "1rem  0" }}>
                <div
                  style={{
                    border: "1px solid #c3c6c9",
                    borderRadius: "10px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>단호박죽</div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "0.5rem" }}>
                      <StyledAmountBtn
                        disabled={productCnt <= 1}
                        aria-disabled={productCnt <= 1}
                        onClick={() => setProductCnt(prev => prev - 1)}
                      >
                        -
                      </StyledAmountBtn>
                      <input
                        style={{
                          width: "60px",
                          height: "35px",
                          padding: "1rem",
                          textAlign: "center",
                          border: "1px solid #c3c6c9",
                          fontWeight: "bold",
                          fontSize: "1.25rem",
                        }}
                        type="number"
                        value={productCnt}
                      />
                      <StyledAmountBtn
                        disabled={productCnt >= 10}
                        aria-disabled={productCnt >= 10}
                        onClick={() => setProductCnt(prev => prev + 1)}
                      >
                        +
                      </StyledAmountBtn>
                    </div>
                    <div>5,700원</div>
                  </div>
                </div>
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
                  <span style={{ color: "red", fontSize: "2rem", fontWeight: "bold" }}>5,700원</span>
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
                {/* <button style={{ width: "270px", height: "70px" }}>입고예정</button> */}
                <button
                  style={{
                    width: "270px",
                    height: "70px",
                    background: "#237c60",
                    color: "white",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
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
            </div>
          </div>
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
                  margin: "auto",
                }}
                onClick={handleClickDetailViewBtn}
              >
                상품정보 더 보기
              </button>
            )}
          </div>
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
              {products.map((product, index) => (
                <Product key={index} product={product} miniSize={true} />
              ))}
            </div>
          </div>
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
              {products.map((product, index) => (
                <Product key={index} product={product} miniSize={true} />
              ))}
            </div>
          </div>
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

export default PageDetail;
