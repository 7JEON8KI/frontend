import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    background-color: ${theme.colors.bgColor};
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  #container {
    max-width: 2100px;
    margin: 0 auto;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  p,span {
    cursor: default;
  }
  // slick 슬라이더 스타일
  button.slick-arrow {
    width: 30px;
    height: 30px;

    &.slick-prev {
      left: -75px;
    }

    &.slick-next {
      right: -75px;
    }

    &::before {
      font-size: 30px;
      color: black;
    }

    ${({ theme }) => theme.media.md`
      &.slick-prev {
        left: -35px;
      }

      &.slick-next {
        right: -35px;
      }

      &::before {
        font-size: 20px;
        color: black;
      }
`}
  }
`;

export default GlobalStyle;
