import React from "react";

interface CartModalProps {
  onClickBtn1: () => void;
  onClickBtn2: () => void;
}
const CartModal = ({ onClickBtn1, onClickBtn2 }: CartModalProps) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <p
        style={{ fontSize: "2rem", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}
      >
        장바구니에 상품을 담았습니다.
      </p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
        <button
          onClick={onClickBtn1}
          style={{ width: "200px", height: "40px", border: "1px solid orange", color: "orange" }}
        >
          계속 쇼핑하기
        </button>
        <button onClick={onClickBtn2} style={{ width: "200px", height: "40px", background: "orange", color: "white" }}>
          장바구니 가기
        </button>
      </div>
    </div>
  );
};

export default CartModal;
