export const MIN_PRODUCT_AMOUNT = 1;
export const MAX_PRODUCT_AMOUNT = 99;
export const DEFAULT_DELIVERY_FEE = 3000;
export const FREE_SHIPPING_THRESHOLD = 40000;

export enum Sort {
  NEW = "NEW",
  HIGH_PRICE = "HIGH_PRICE",
  LOW_PRICE = "LOW_PRICE",
  MOST_ORDER = "MOST_ORDER",
}

export enum ThemeName {
  HOME = "홈파티",
  SOLO = "1인가구",
  CAMPING = "캠핑",
}

export interface Theme {
  name: ThemeName;
  description: string;
}

interface Themes {
  [key: string]: Theme;
}

export const Themes: Themes = {
  [ThemeName.HOME]: {
    name: ThemeName.HOME,
    description: "집에서의 완벽한 파티를 위한, 세련되고 간편한 밀키트",
  },
  [ThemeName.SOLO]: {
    name: ThemeName.SOLO,
    description: "혼자라도 완벽한 식사를!",
  },
  [ThemeName.CAMPING]: {
    name: ThemeName.CAMPING,
    description: "야외에서도 맛있고 간편하게, 캠핑의 즐거움을 극대화할 밀키트로 자연 속에서의 식사를 업그레이드",
  },
};
