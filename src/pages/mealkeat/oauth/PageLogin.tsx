import React from "react";
import { Layout } from "components/mealkeat";
import kakaoButton from "assets/images/kakao_login_large_wide.png";
const PageLogin: React.FC = () => {
  const onClickLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("로그인 버튼 클릭");

    // if (result.success) {
    //   console.log("로그인 성공");
    // history.push("/");
    // } else {
    //   console.log("로그인 실패");
    //  history.push("/fail");
    // }
  };
  return (
    <Layout>
      <main style={{ width: "100%", margin: "170px auto 300px" }}>
        <div style={{ width: "600px", height: "685px", margin: "170px auto 300px" }}>
          <p style={{ fontSize: "60px", padding: "50px 70px", textAlign: "center" }}>로그인</p>
          <div
            style={{
              height: "290px",
              borderTop: "solid black 5px",
              borderBottom: "solid black 5px",
              verticalAlign: "center",
            }}
          >
            <p style={{ width: "387px", fontSize: "60px", textAlign: "left", margin: "auto", marginTop: "70px" }}>
              맛있는<span style={{ color: "#FD6F21", fontWeight: "bold", fontSize: "60px" }}>선택</span>,
            </p>
            <p style={{ width: "387px", fontSize: "60px", textAlign: "right", margin: "auto" }}>
              나만의<span style={{ color: "#FD6F21", fontWeight: "bold", fontSize: "60px" }}>기준</span>
            </p>
          </div>
          <p
            style={{
              margin: "120px auto 10px",
              padding: "20px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            SNS 계정으로 로그인하기
          </p>
          <button
            type="button"
            style={{
              display: "block",
              margin: "auto",
              // backgroundImage: "url(`'assets/images/kakao_login_large_wide.png'`)",
              backgroundImage: `url(${kakaoButton})`,
              cursor: "pointer",
              width: "600px",
              height: "90px",
              backgroundSize: "cover", // 이미지를 버튼 크기에 맞게 조정
            }}
            onClick={onClickLogin}
          ></button>
        </div>
      </main>
    </Layout>
  );
};

export default PageLogin;
