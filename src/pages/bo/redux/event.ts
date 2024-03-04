const CHANGE_BY = "event/CHANGE_BY" as const;

export const changeBy = (diff: EventState) => ({
  type: CHANGE_BY,
  payload: diff,
});

type EventAction = ReturnType<typeof changeBy>;

type EventState = {
  bannerTitle: string;
  bannerImageUrl: string;
  bannerStartDay: string;
  bannerEndDay: string;
};

const initialState: EventState = {
  bannerTitle: "배너 이름",
  bannerImageUrl: "start_url",
  bannerStartDay: "start_date",
  bannerEndDay: "end_date",
};

function event(state: EventState = initialState, action: EventAction): EventState {
  switch (action.type) {
    case CHANGE_BY:
      return {
        bannerTitle: action.payload.bannerTitle,
        bannerImageUrl: action.payload.bannerImageUrl,
        bannerStartDay: action.payload.bannerStartDay,
        bannerEndDay: action.payload.bannerEndDay,
      };
    default:
      return state;
  }
}

export default event;
