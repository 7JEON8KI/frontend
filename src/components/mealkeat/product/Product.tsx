import React from "react";

interface Props {
  children: React.ReactNode;
}

const Product = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

export default Product;
