import React from "react";
import { Layout } from "components/mealkeat";
import Sidebar from "components/mealkeat/mypage/Sidebar";
import { MainContent, ContentSection } from "./PageMypage.style";
import { Route, Routes } from "react-router-dom";
import MyPageCoupon from "./PageMypageCoupon";
import MyPagePoint from "./PageMypagePoint";

const PageMypage: React.FC = () => {
  return (
    <Layout>
      <MainContent>
        <Sidebar />
        <ContentSection>
          <Routes>
            <Route path={"/coupon"} element={<MyPageCoupon />} />
            <Route path={"/point"} element={<MyPagePoint />} />
          </Routes>
        </ContentSection>
      </MainContent>
    </Layout>
  );
};

export default PageMypage;
