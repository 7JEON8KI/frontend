import React from "react";
import { Layout } from "components/mealkeat";
import Sidebar from "components/mealkeat/mypage/Sidebar";
import { MainContent, ContentSection } from "./PageMypage.style";
import { Route, Routes } from "react-router-dom";
import MyPageCoupon from "./PageMypageCoupon";
import MyPagePoint from "./PageMypagePoint";
import MyPageLike from "./PageMypageLike";
import MyPageReview from "./PageMypageReview";
import ModalReview from "./ModalReview";
import MyPageOrder from "./PageMypageOrder";
import MypageOrderDetail from "./PageMypageOrderDetail";

const PageMypage: React.FC = () => {
  return (
    <Layout>
      <MainContent>
        <Sidebar />
        <ContentSection>
          <Routes>
            <Route path={"/order"} element={<MyPageOrder />} />
            <Route path={"/order/detail/:id"} element={<MypageOrderDetail />} />
            <Route path={"/coupon"} element={<MyPageCoupon />} />
            <Route path={"/point"} element={<MyPagePoint />} />
            <Route path={"/like"} element={<MyPageLike />} />
            <Route path={"/review"} element={<MyPageReview />} />
            <Route path={"/review/:id"} element={<ModalReview />} />
          </Routes>
        </ContentSection>
      </MainContent>
    </Layout>
  );
};

export default PageMypage;
