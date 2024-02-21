import { css } from "styled-components";

/** 자주 사용하는 색상들 */
const colors = {
  mainColor: "#fd6f21",
  bgColor: "#f7f7f7",
  pointSubColor: "237c60",
  pointSubColor2: "1c5641",
  black: "#282828",
  darkGrey: "#5f5f5f",
  mediumGrey: "c3c6c9",
  lightGrey: "d0d0d0",
  white: "#f4f4f4",

  indigo600: "#4f46e5",
  indigo300: "#a5b4fc",
};

/** 검정 배경 */
export const darkTheme = {
  color: colors.white,
  bgColor: colors.black,
  gray: "#343434",
};
/** 흰색 배경 */
export const lightTheme = {
  color: colors.black,
  bgColor: colors.bgColor,
  gray: colors.lightGrey,
};

const shadows: { [key: string]: string } = {
  default: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
};
/** 반응형 사이즈 */
const sizes: { [key: string]: number } = {
  xxl: 1920, // for big screens, default media size
  xl: 1440, // for desktop / monitors
  lg: 1280, // for laptops
  md: 900, // for tablets
  sm: 600, // for mobile screen
  xs: 400, // for small screen mobile
  desktop: 1024,
  tablet: 768,
  mobile: 425,
};

interface Media {
  xxl: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  xl: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  lg: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  md: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  sm: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  xs: (...args: Parameters<typeof css>) => ReturnType<typeof css>;

  desktop: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  tablet: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
  mobile: (...args: Parameters<typeof css>) => ReturnType<typeof css>;
}

const media: Media = {
  xxl: (...args) => css`
    @media only screen and (max-width: ${sizes.xxl - 1}px) {
      ${args}
    }
  `,
  xl: (...args) => css`
    @media only screen and (max-width: ${sizes.xl}px) {
      ${args}
    }
  `,
  lg: (...args) => css`
    @media only screen and (max-width: ${sizes.lg}px) {
      ${args}
    }
  `,
  md: (...args) => css`
    @media only screen and (max-width: ${sizes.md}px) {
      ${args}
    }
  `,
  sm: (...args) => css`
    @media only screen and (max-width: ${sizes.sm}px) {
      ${args}
    }
  `,
  xs: (...args) => css`
    @media only screen and (max-width: ${sizes.xs}px) {
      ${args}
    }
  `,
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
  xxl: "1.5rem",
  big: "2rem",
  tooBig: "2.5rem",
};

/** 그 외의 크기 */
const size = {
  xs: "0.2em",
  sm: "0.4em",
  md: "0.6em",
  lg: "1em",
  xl: "1.4em",
  xxl: "1.6em",
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
  shadows,
  media,
  fontSize,
  size,
  util,
};

export default theme;

/** 타입 재정의를 위함 ( "styled-components" 변수 타입 추론을 위함( 자동완성 ) ) */
export type Theme = typeof theme;
