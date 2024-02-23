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
    // 보안상 노출되면 안되는 데이터는 .env에 작성하여 호출하였다.
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;

    // process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    // process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&response_type=code&prompt=login&client_id=${client_id}&redirect_uri=${redirect_uri}`;

    //cors 이슈로 인해 href 방식으로 호출
    window.location.href = url;
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
