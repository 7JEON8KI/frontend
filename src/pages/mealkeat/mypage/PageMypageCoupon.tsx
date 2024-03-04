import React, { useEffect } from "react";
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
import mypageCouponApi from "apis/MypageCouponApi";

interface Coupon {
  couponId: number;
  memberId: string;
  couponName: string;
  discountRate: number;
  discountPrice: number;
  createdAt: Date;
  expiredAt: Date;
}

function createCoupon(
  couponId: number,
  memberId: string,
  couponName: string,
  discountRate: number,
  discountPrice: number,
  createdAt: Date,
  expiredAt: Date,
): Coupon {
  return {
    couponId,
    memberId,
    couponName,
    discountRate,
    discountPrice,
    createdAt,
    expiredAt,
  };
}

const MyPageCoupon: React.FC = () => {
  const [couponList, setCouponList] = React.useState<Coupon[]>([]);
  const [couponCount, setCouponCount] = React.useState(0); // 쿠폰 수를 저장하는 상태를 추가
  const getCoupons = async () => {
    const detail = await mypageCouponApi.getCoupons();
    const coupons = await detail.data.map((coupon: Coupon) => {
      return createCoupon(
        coupon.couponId,
        coupon.memberId,
        coupon.couponName,
        coupon.discountRate,
        coupon.discountPrice,
        coupon.createdAt,
        coupon.expiredAt,
      );
    });
    setCouponList(coupons);
    setCouponCount(coupons.length);
  };

  useEffect(() => {
    getCoupons();
    console.log(couponList);
    return () => {};
  }, []);

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
          보유쿠폰 총 <span style={{ color: "orange" }}>{couponCount}장</span> {/* 보유 쿠폰의 수를 표시 */}
        </CouponSection>
        <FlexContainer>
          {couponList.map(coupon => (
            <CouponItem key={coupon.couponId}>
              <IconContainer>
                {coupon.discountPrice > 0 ? <FaShoppingCart size={60} /> : <PiPercentLight size={60} />}
              </IconContainer>
              <CouponInfo>
                <button>
                  <IoTrashOutline size={25} />
                </button>
                <Title style={{ marginRight: "40px" }}>{coupon.couponName}</Title>
                <div>{coupon.discountPrice > 0 ? `${coupon.discountPrice}원` : `최대 ${coupon.discountRate}%`}</div>
              </CouponInfo>
            </CouponItem>
          ))}
        </FlexContainer>

        {/* <FlexContainer>
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
        </FlexContainer> */}
      </MainContainer>
    </>
  );
};

export default MyPageCoupon;
