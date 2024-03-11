import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import checktPath from "assets/images/icons/except.png";
import checkClickPath from "assets/images/icons/except_click.png";
import formatCurrency from "utils/formatCurrency";
import likeApi from "apis/likeApi";
import cartApi from "apis/cartApi";
import { ModalContainer, CartModal } from "components/mealkeat";
import { useNavigate } from "react-router-dom";
import { setCnt } from "feature/login/cartSlice";
import { useDispatch } from "react-redux";

interface LikeProduct {
  likeId: number;
  productId: number;
  productName: string;
  productSubName: string;
  price: number;
  productType: string;
  amount: number;
  thumbnailImageUrl: string;
  selected: boolean;
}

const PageMypageLike: React.FC = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [likeProduct, setLikeProduct] = useState<LikeProduct[]>([]);
  const [cartModal, setCartModal] = React.useState<boolean>(false);
  const handleSelectAllClick = () => {
    const prev = selectAll;
    setSelectAll(!prev);

    const newCartProduct = likeProduct.map(item => ({ ...item, selected: !prev }));
    setLikeProduct(newCartProduct);
  };

  const handleSelectItemClick = (index: number) => {
    const newLikeProduct = likeProduct.map((item, i) => {
      if (i === index) {
        return { ...item, selected: !item.selected };
      }
      return { ...item };
    });
    const isAll = newLikeProduct.every(item => item.selected);
    setSelectAll(isAll);
    setLikeProduct(newLikeProduct);
  };

  const handleDeleteSelected = () => {
    const selectedIds = likeProduct.filter(item => item.selected).map(item => item.productId);
    for (const id of selectedIds) {
      deleteLikes(id);
    }
    const newLikeProduct = likeProduct.filter(item => !item.selected);
    setLikeProduct(newLikeProduct);
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = likeProduct.filter(product => product.likeId !== productId);
    setLikeProduct(updatedProducts);
  };

  const getLikes = async () => {
    const likes = await likeApi.getLikes();
    setLikeProduct(likes.data);
  };

  const deleteLikes = async (productId: number) => {
    await likeApi.deleteLikes(productId);
  };

  const saveCart = async (productId: number) => {
    const data = {
      cartProductCnt: 1,
      productId: productId,
    };
    await cartApi
      .saveCart(data)
      .then(() => {
        cartApi.getCartsCount().then(res => {
          dispatch(setCnt(res.data));
        });

        alert("장바구니에 상품이 추가되었습니다.");
      })
      .catch(err => {
        console.error(err);
        alert("상품 추가에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      <Title>찜한 목록</Title>
      <section style={{ border: "1px solid #f4f4f4", width: "90%", margin: "auto" }}>
        <div
          style={{
            height: "55px",
            display: "flex",
            gap: "1rem",
            padding: "1.5rem 1rem",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "24px",
              height: "24px",
              backgroundImage: `url(${selectAll ? checkClickPath : checktPath})`,
              backgroundSize: "cover",
            }}
            onClick={handleSelectAllClick}
            title="전체선택"
            aria-selected={selectAll}
          ></button>
          전체선택
          <button
            style={{
              width: "100px",
              height: "30px",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "1px solid #d0d0d0",
              color: "#fd6f21",
            }}
            onClick={handleDeleteSelected}
          >
            선택삭제
          </button>
        </div>
        {likeProduct.length > 0 ? (
          likeProduct.map((product, i) => (
            <div
              key={i}
              style={{
                height: "210px",
                display: "flex",
                gap: "1rem",
                padding: "1.5rem 1rem",
                borderTop: "1px solid #d0d0d0",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundImage: `url(${product?.selected ? checkClickPath : checktPath})`,
                  backgroundSize: "cover",
                  padding: "0.5rem 0.5rem",
                }}
                onClick={() => {
                  handleSelectItemClick(i);
                }}
              ></button>
              <img draggable={false} src={product.thumbnailImageUrl} style={{ width: "150px", height: "150px" }} />
              <div
                style={{
                  width: "550px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <span>{product.productName}</span>
                <span>{formatCurrency({ amount: product.price, locale: "ko-KR" })}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  margin: "1rem 0",
                }}
              >
                <button
                  style={{
                    width: "250px",
                    height: "50px",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    border: "2px solid #fd6f21",
                    color: "#fd6f21",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    saveCart(product.productId);
                    setCartModal(true);
                  }}
                >
                  장바구니 담기
                </button>
                <button
                  style={{
                    width: "250px",
                    height: "50px",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    border: "1px solid #d0d0d0",
                    color: "#fd6f21",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    deleteLikes(product.productId);
                    handleDeleteProduct(product.likeId);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              height: "210px",
              padding: "1.5rem 1rem",
              borderTop: "1px solid #d0d0d0",
              fontSize: "1.5rem",
              fontFamily: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                verticalAlign: "middle",
              }}
            >
              찜한 상품이 없습니다.
            </span>
          </div>
        )}
      </section>
      <ModalContainer
        title="장바구니 담기"
        isOpen={cartModal}
        onClose={() => setCartModal(false)}
        width="670px"
        height="300px"
      >
        <CartModal
          onClickBtn1={() => setCartModal(false)}
          onClickBtn2={() => {
            goToCart();
          }}
        />
      </ModalContainer>
    </>
  );
};

export default PageMypageLike;
