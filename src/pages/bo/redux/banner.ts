import { Banner } from "components/bo/type/AdminData";

const CHANGE_BANNER = "banner/CHANGE_BANNER" as const;

export const changeBanner = (diff: Banner) => ({
  type: CHANGE_BANNER,
  payload: diff,
});

type BannerAction = ReturnType<typeof changeBanner>;

type BannerState = {
  banner: Banner;
};

const initialState: BannerState = {
  banner: {} as Banner,
};

function banner(state: BannerState = initialState, action: BannerAction): BannerState {
  switch (action.type) {
    case CHANGE_BANNER:
      return {
        banner: action.payload,
      };
    default:
      return state;
  }
}

export default banner;
