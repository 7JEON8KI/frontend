import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
function KakaoCallback() {
  const navigate = useNavigate();
  // 최초 렌더링 시 발동
  React.useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("카카오에서 받은 인가 코드 : " + code);
    const kakaoParams = JSON.stringify({
      authorizationCode: code,
      oAuthProvider: "KAKAO",
    });
    console.log("kakaoParams : " + kakaoParams);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login/kakao`, kakaoParams, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(response => response.data)
      .then(response => {
        //spring에서 발급된 jwt localStorage 저장
        localStorage.setItem("Authorization", "Bearer " + response.data.accessToken);
        //메인 페이지로 이동
        navigate("/", { replace: true });
      })
      .catch(err => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        console.log(err);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return <div>loading</div>;
}

export default KakaoCallback;
