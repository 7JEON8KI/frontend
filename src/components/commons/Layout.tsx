import React from "react";
import { StyledLayout } from "styles/components/commons/Layout.style";
import Header from "components/commons/Header";
import Footer from "components/commons/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <StyledLayout>
      <Header />
      {children}
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
