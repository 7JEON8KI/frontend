import React from "react";
import { Layout, Product } from "components/mealkeat";
import except from "assets/images/icons/except.png";
import exceptClick from "assets/images/icons/except_click.png";

const PageList: React.FC = () => {
  const [clickExcept, setClickExcept] = React.useState<boolean>(false);
  const products = Array(12)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/400x400",
      title: `${idx + 1}.[새벽시장] 맛있는 명인 손만두, 최대 한줄까지 작성 가능합니다.`,
      description:
        "내용입니다. 최대 한줄까지~~!! 한줄까지~~!! 한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    }));

  return (
    <Layout>
      <main style={{ width: "100%" }}>
        <div style={{ width: "1290px", margin: "40px auto" }} className="topMenu">
          <p style={{ margin: "auto", fontSize: "30px", textAlign: "center", marginBottom: "60px" }}>전체상품</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: " 100%",
              borderTop: "1px solid black",
              borderBottom: "1px solid #dfdfdf",
              margin: "auto",
            }}
          >
            <span style={{ padding: "1.5rem", fontSize: "0.875rem", verticalAlign: "middle" }}>총 262건</span>
            <div style={{ padding: "1rem 0" }}>
              <div style={{ display: "inline-block" }} onClick={() => setClickExcept(prev => !prev)}>
                <img
                  src={clickExcept ? exceptClick : except}
                  alt=""
                  style={{
                    width: "35px",
                    height: "35px",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ padding: "0 1rem", fontSize: "0.875rem", borderRight: "1px solid #dfdfdf" }}>
                  품절 상품제외
                </span>
              </div>
              <span style={{ padding: "0 1rem", fontSize: "0.875rem", borderRight: "1px solid #dfdfdf" }}>
                최신상품
              </span>
              <span style={{ padding: "0 1rem", fontSize: "0.875rem", borderRight: "1px solid #dfdfdf" }}>
                낮은가격
              </span>
              <span style={{ padding: "0 1rem", fontSize: "0.875rem", borderRight: "1px solid #dfdfdf" }}>
                높은가격
              </span>
              <span style={{ padding: "0 1rem", fontSize: "0.875rem" }}>인기상품</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              justifyItems: "center",
              gap: "50px 0",
              marginTop: "60px",
            }}
          >
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PageList;
