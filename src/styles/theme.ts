/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, CSSProp } from "styled-components";

/** 자주 사용하는 색상들 */
const colors = {
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  /* 나머지 색상들 생략 ( https://tailwindcss.com/docs/customizing-colors ) */

  main50: "#eef2ff",
  main100: "#e0e7ff",
  main200: "#c7d2fe",
  main300: "#a5b4fc",
  main400: "#818cf8",
  main500: "#6366f1",
  main600: "#4f46e5",
  main700: "#4338ca",
  main800: "#3730a3",
  main900: "#312e81",

  /* 아래 부분을 비워둔 이유는 타입때문 ( "<ThemeProvider>"에서 조건에 따라 다르게 값을 채움 ) */
  color: "",
  bgColor: "",
  gray: "",
};

/** 검정 배경 */
export const darkTheme = {
  color: "#000000",
  bgColor: "#FFFFFF",
  gray: "#343434",
};
/** 흰색 배경 */
export const lightTheme = {
  color: "#FFFFFF",
  bgColor: "#000000",
  gray: "#D9D9D9",
};

/** 반응형 사이즈 */
// const mediaSize = {
//   // xs: "screen and (max-width: '400px')", //모바일
//   // sm: "screen and (max-width: '640px')", //태블릿
//   // md: "screen and (max-width: '768px')", //태블릿
//   // lg: "screen and (max-width: '1024px')", //데스크탑
//   // xl: "screen and (max-width: '1280px')", //데스크탑
//   // "2xl": "screen and (max-width: '1536px')", //데스크탑
//   desktop: "screen and (min-width: 1024px)",
//   tablet: "screen and (min-width: 640px)",
//   mobile: "screen and (min-width: 400px)",
// };

const sizes: { [key: string]: number } = {
  mobile: 450,
  tablet: 768,
  desktop: 1024,
};

interface Media {
  mobile: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  tablet: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  desktop: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
}

const media: Media = {
  // desktop: (...args) => css`
  //   @media only screen and (min-width: ${sizes.desktop}px) {
  //     ${css(...args)}
  //   }
  // `,
  // tablet: (...args) => css`
  //   @media only screen and (max-width: ${sizes.desktop - 1}px) and (min-width: ${sizes.tablet}px) {
  //     ${css(...args)}
  //   }
  // `,
  // mobile: (...args) => css`
  //   @media only screen and (max-width: ${sizes.tablet - 1}px) {
  //     ${css(...args)}
  //   }
  // `,
  mobile: (...args) => css`
    @media only screen and (max-width: ${sizes.mobile}px) {
      ${args}
    }
  `,
  tablet: (...args) => css`
    @media only screen and (min-width: ${sizes.mobile}px) and (max-width: ${sizes.desktop}px) {
      ${args}
    }
  `,
  desktop: (...args) => css`
    @media only screen and (min-width: ${sizes.desktop}px) {
      ${args}
    }
  `,
};

/** 폰트 크기 */
const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
};

/** 그 외의 크기 */
const size = {
  xs: "0.2em",
  sm: "0.4em",
  md: "0.6em",
  lg: "1em",
  xl: "1.4em",
  "2xl": "1.6em",
};

/** 유틸리티 */
const util = {
  truncate: () => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  scroll: () => css`
    &::-webkit-scrollbar {
      /** 스크롤바의 너비 */
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /** 스크롤바 길이 */
      height: 25%;
      /** 스크롤바의 색상 */
      background: ${({ theme }) => theme.colors.indigo600};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      /** 스크롤바 뒷 배경 색상 */
      background: ${({ theme }) => theme.colors.indigo300};
    }
  `,
};

const theme = {
  colors,
  media,
  fontSize,
  size,
  util,
};

export default theme;

/** 타입 재정의를 위함 ( "styled-components" 변수 타입 추론을 위함( 자동완성 ) ) */
export type Theme = typeof theme;
