import React from "react";
import { StyledFooter, FooterItem } from "./Footer.style";
import { Logo } from "components/mealkeat";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";

export const Footer = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <FooterItem>
        <Logo />
      </FooterItem>
      <FooterItem>
        <div className="title">Mealkeat</div>
        <p>밀키트를 더 간편하게 맛있게 즐겨보자!</p>
        <p>서울 성동구 자동차시장1길 64청년취업사관학교 성동캠퍼스</p>
        <p>02 6216 3804</p>
        <p>www.mealkeat.com</p>
      </FooterItem>
      <FooterItem>
        <div className="title">Menu</div>
        <button
          type="button"
          title="선택 시 전체 상품 페이지로 이동"
          onClick={() => {
            scrollToTop({});
            navigate("/list");
          }}
        >
          전체 상품
        </button>
        <button
          type="button"
          title="선택 시 밀킷 추천 페이지로 이동"
          onClick={() => {
            scrollToTop({});
            navigate("/recommand");
          }}
        >
          밀킷 추천
        </button>
        <button
          type="button"
          title="선택 시 테마별 페이지로 이동"
          onClick={() => {
            scrollToTop({});
            navigate("/theme");
          }}
        >
          테마별
        </button>
        <button
          type="button"
          title="선택 시 베스트 페이지로 이동"
          onClick={() => {
            scrollToTop({});
            navigate("/best");
          }}
        >
          베스트
        </button>
      </FooterItem>
      <FooterItem>
        <div className="title">Mypage</div>
        <button type="button" title="선택 시 마이페이지 주문현황으로 이동">
          주문현황
        </button>
        <button type="button" title="선택 시 마이페이지 쇼핑통장으로 이동">
          쇼핑통장
        </button>
        <button type="button" title="선택 시 마이페이지 나의 활동으로 이동">
          나의 활동
        </button>
        <button type="button" title="선택 시 마이페이지 고객센터로 이동">
          고객센터
        </button>
        <button type="button" title="선택 시 마이페이지 회원정보로 이동">
          회원정보
        </button>
      </FooterItem>
    </StyledFooter>
  );
};

export default Footer;
