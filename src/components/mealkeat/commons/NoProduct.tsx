import React from "react";
import styled from "styled-components";
import Sorry from "assets/images/sorry.png";
import Image from "./Image";

export const NoProductDiv = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 7rem auto 0;
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: center;
`;

const NoProduct = () => {
  return (
    <NoProductDiv>
      <Image src={Sorry} width={150} height={150} alt="" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2rem" }}>
        <p>조건에 맞는 상품이 존재하지 않습니다.</p>
        <p>
          더 많은 상품을 준비하는 <span style={{ color: "#fd6f21" }}>밀킷</span>이 되도록 노력하겠습니다.
        </p>
      </div>
    </NoProductDiv>
  );
};

export default NoProduct;
