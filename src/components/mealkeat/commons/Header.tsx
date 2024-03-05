import React, { useState, useEffect } from "react";
import { Logo, Image } from "components/mealkeat";
import SearchPath from "assets/images/icons/Search.png";
import HeartPath from "assets/images/icons/Heart.png";
import CartPath from "assets/images/icons/Cart.png";
import UserPath from "assets/images/icons/User.png";
import MypagePath from "assets/images/icons/Mypage.png";
import MenuPath from "assets/images/icons/Menu.png";
import Upload from "assets/images/icons/upload_icon.png";
import { Header as StyledHeader, Search, IconList, Icon, TopNav, NavMenu, ImageSearchBtn } from "./Header.style";
import { useNavigate } from "react-router-dom";
import cartApi from "apis/cartApi";
import productApi from "apis/productApi";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [word, setWord] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cartsCount, setCartsCount] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (word.trim()) navigate("/search", { state: { searchWord: word.trim() } });
      else window.alert("검색어를 입력해주세요.");
    }
  };

  const handleProtectedRoute = (path: string) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      productApi.getProductsWithImageSearch(formData);
    }
  };

  const fetchCartsCount = async () => {
    const result = await cartApi.getCartsCount();
    setCartsCount(result.data);
  };

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 Authorization 토큰 제거
    localStorage.removeItem("Authorization");
    setIsLoggedIn(false); // 로그인 상태 업데이트
    setCartsCount(0); // 장바구니 수량 초기화
    navigate("/"); // 홈으로 리디렉션 또는 원하는 경로로 변경
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("Authorization");
      setIsLoggedIn(!!token);
      if (token) fetchCartsCount();
    };
    checkAuthStatus();
    // 페이지가 포커스를 받을 때마다 로그인 상태를 체크
    window.addEventListener("focus", checkAuthStatus);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("focus", checkAuthStatus);
  }, []);

  return (
    <StyledHeader>
      <div className="frame">
        <Logo />
        <Search>
          <label htmlFor="search">
            <img src={SearchPath} alt="검색 아이콘" draggable={false} />
            <input
              id="search"
              type="text"
              placeholder="지금 먹고싶은 재료를 검색하세요!"
              value={word}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
            <ImageSearchBtn onClick={handleButtonClick}>
              <Image src={Upload} alt="" width={30} height={30} />
              <p>이미지 업로드</p>
            </ImageSearchBtn>
          </label>
        </Search>
        <IconList>
          <Icon onClick={() => handleProtectedRoute("/mypage/like")}>
            <img src={HeartPath} alt="찜 아이콘" draggable={false} />
            <span>찜 목록</span>
          </Icon>
          <Icon onClick={() => handleProtectedRoute("/cart")} $amount={cartsCount}>
            <img src={CartPath} alt="장바구니 아이콘" draggable={false} />
            <span>장바구니</span>
          </Icon>
          {isLoggedIn ? (
            <>
              <Icon onClick={handleLogout}>
                <img src={UserPath} alt="로그아웃 아이콘" draggable={false} />
                <span>로그아웃</span>
              </Icon>
              <Icon onClick={() => handleProtectedRoute("/mypage/order")}>
                <img src={MypagePath} alt="마이페이지 아이콘" draggable={false} />
                <span>마이페이지</span>
              </Icon>
            </>
          ) : (
            <Icon onClick={() => navigate("/login")}>
              <img src={UserPath} alt="로그인 아이콘" draggable={false} />
              <span>로그인</span>
            </Icon>
          )}
        </IconList>
        <TopNav>
          <NavMenu title="클릭 시 전체상품 페이지로 이동" onClick={() => navigate("/list")}>
            <img src={MenuPath} alt="메뉴 아이콘" draggable={false} />
            전체상품
          </NavMenu>
          <NavMenu title="클릭 시 밀킷 추천 페이지로 이동" onClick={() => navigate("/recommend")}>
            밀킷 추천
          </NavMenu>
          <NavMenu title="클릭 시 와인 페이지로 이동" onClick={() => navigate("/wine")}>
            와인
          </NavMenu>
          {/* <NavMenu title="클릭 시 이벤트 페이지로 이동" onClick={() => navigate("/event")}>
            이벤트
          </NavMenu> */}
          <NavMenu title="클릭 시 테마별 페이지로 이동" onClick={() => navigate("/theme")}>
            테마별
          </NavMenu>
          <NavMenu title="클릭 시 베스트 페이지로 이동" onClick={() => navigate("/best")}>
            베스트
          </NavMenu>
        </TopNav>
      </div>
    </StyledHeader>
  );
};

export default Header;
