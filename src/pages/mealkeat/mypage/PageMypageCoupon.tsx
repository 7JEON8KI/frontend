import React from "react";
import {
  Title,
  Container,
  InputContainer,
  Input,
  Button,
  MainContainer,
  FlexContainer,
  SubTitle,
  CouponSection,
  CouponItem,
  IconContainer,
  CouponInfo,
} from "./PageMypageCoupon.style";
import { FaShoppingCart } from "react-icons/fa";
import { PiPercentLight } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";

const MyPageCoupon: React.FC = () => {
  return (
    <>
      <Title>쿠폰</Title>
      {/* 쿠폰 등록 */}
      <Container>
        <div style={{ padding: "10px" }}>쿠폰 등록</div>
        <InputContainer>
          <Input type="text" placeholder="번호를 입력해주세요." />
        </InputContainer>
        <Button>등록하기</Button>
      </Container>
      {/* 보유 쿠폰, 다운로드 가능 쿠폰 */}
      <MainContainer>
        <SubTitle>보유 쿠폰</SubTitle>
        <CouponSection>
          보유쿠폰 총 <span style={{ color: "orange" }}>1장</span>
        </CouponSection>
        <FlexContainer>
          <CouponItem>
            <IconContainer>
              <FaShoppingCart size={60} />
            </IconContainer>
            <CouponInfo>
              <button>
                <IoTrashOutline size={25} />
              </button>
              <Title style={{ marginRight: "40px" }}>[장바구니 쿠폰]</Title>
              <div>3,000원</div>
            </CouponInfo>
          </CouponItem>
          <CouponItem>
            <IconContainer>
              <PiPercentLight size={60} />
            </IconContainer>
            <CouponInfo>
              <button>
                <IoTrashOutline size={25} />
              </button>
              <Title style={{ marginRight: "40px" }}>[브랜드 10% 쿠폰]</Title>
              <div>최대 3,000원</div>
            </CouponInfo>
          </CouponItem>
        </FlexContainer>
      </MainContainer>
    </>
  );
};

export default MyPageCoupon;
