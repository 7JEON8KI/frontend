import React from "react";
import { SidebarContainer, Title, Section, SectionTitle, SectionButton } from "./Sidebar.style";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Title>마이페이지</Title>
      <Section>
        <SectionTitle>주문현황</SectionTitle>
        <SectionButton type="button">주문/배송현황</SectionButton>
      </Section>
      <Section>
        <SectionTitle>쇼핑통장</SectionTitle>
        <SectionButton type="button">쿠폰</SectionButton>
        <SectionButton type="button">포인트</SectionButton>
      </Section>
      <Section>
        <SectionTitle>나의 활동</SectionTitle>
        <SectionButton type="button">찜</SectionButton>
        <SectionButton type="button">리뷰</SectionButton>
      </Section>
      <Section>
        <SectionTitle>고객센터</SectionTitle>
        <SectionButton type="button">1:1 문의</SectionButton>
      </Section>
      <Section>
        <SectionTitle>회원정보</SectionTitle>
        <SectionButton type="button">회원정보관리</SectionButton>
        <SectionButton type="button">회원탈퇴</SectionButton>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
