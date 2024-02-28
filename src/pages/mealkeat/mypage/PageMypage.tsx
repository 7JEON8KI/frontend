import React from "react";
import { Layout } from "components/mealkeat";
import Sidebar from "components/mealkeat/mypage/Sidebar";
import { MainContent, ContentSection } from "./PageMypage.style";

const PageMypage: React.FC = () => {
  return (
    <Layout>
      <MainContent>
        <Sidebar />
        <ContentSection></ContentSection>
      </MainContent>
    </Layout>
  );
};

export default PageMypage;
