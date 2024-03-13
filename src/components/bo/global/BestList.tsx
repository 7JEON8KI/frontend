import React, { useEffect } from "react";
import productApi from "apis/productApi";
import { Sort } from "constants/productConstants";
import { ProductResponse } from "models/mealkeat/ProductModels";
import { ProductSortRequest } from "models/mealkeat/ProductModels";
import { useNavigate } from "react-router-dom";

export default function BestList() {
  const navigate = useNavigate();
  const [productList, setProductList] = React.useState<ProductResponse>();
  const [productSort] = React.useState<ProductSortRequest>({
    productCriteria: {
      pageNum: 1,
      pageAmount: 3,
      sort: Sort.MOST_ORDER,
      includeSoldOut: 1,
    },
  });

  const getProducts = async () => {
    const fetchProduct = await productApi.getProducts({ ...productSort });
    setProductList(fetchProduct.data);
  };

  const handleProductClick = () => {
    navigate("/bo/admin/product");
  };

  useEffect(() => {
    getProducts();

    return () => {};
  }, [productSort]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
      }}
    >
      {productList?.productResponseDTOList?.map(product => (
        <div
          key={product.productId}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "5px",
            border: "1px solid lightgray",
            width: "30%",
            cursor: "pointer",
          }}
          onClick={() => handleProductClick()}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "left",
            }}
          >
            {productList.productResponseDTOList.indexOf(product) + 1}위
          </span>
          <div
            style={{
              width: "250px",
              height: "200px",
              margin: "10px",
            }}
          >
            <img src={product.thumbnailImageUrl} alt={product.productName} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "250px", // 너비 제한
                whiteSpace: "nowrap", // 텍스트를 한 줄로 표시
                overflow: "hidden", // 넘치는 내용 숨김
                textOverflow: "ellipsis", // 넘치는 텍스트를 말줄임표로 표시
                fontSize: "18px",
              }}
            >
              {product.productName}
            </div>
            {/* 한줄로 표시해서 양쪽으로 벌어지게 */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "250px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {product.price}원
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                남은 재고 : {product.stock}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
