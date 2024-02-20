import React from "react";
import { StyledFooter, FooterItem } from "styles/components/commons/Footer.style";

export const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <FooterItem>
        <div className="title">Mealkeat</div>
        <p>밀키트를 더 간편하게 맛있게 즐겨보자!</p>
        <p>서울 성동구 자동차시장1길 64청년취업사관학교 성동캠퍼스</p>
        <p>02 6216 3804</p>
        <p>www.mealkeat.shop</p>
      </FooterItem>
      <FooterItem>
        <div className="title">Menu</div>
        <p>밀킷 추천</p>
        <p>오븐</p>
        <p>테마별</p>
        <p>베스트</p>
        <p>할인 중</p>
      </FooterItem>
      <FooterItem>
        <div className="title">Mypage</div>
        <p>주문현황</p>
        <p>쇼핑통장</p>
        <p>나의 활동</p>
        <p>고객센터</p>
        <p>나의 활동</p>
      </FooterItem>
      <FooterItem>
        <div className="title">Stay Connected</div>
        <p>Instagram</p>
        {/* <p >자주 묻는 질문</p>
        <p >배송정보</p>
        <p >교환 및 반품</p>
        <p >고객센터</p>
        <p >고객센터</p> */}
      </FooterItem>
      <FooterItem>
        <div className="title">Stay Updated</div>
        <div className="placeholder">Enter your email</div>
      </FooterItem>
    </StyledFooter>
  );
};

export default Footer;
