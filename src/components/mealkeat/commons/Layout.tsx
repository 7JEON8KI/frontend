import React from "react";
import { StyledLayout } from "./Layout.style";
import { Header, Footer } from "components/mealkeat";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <StyledLayout>
      <Header />
      <div id="content">{children}</div>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
