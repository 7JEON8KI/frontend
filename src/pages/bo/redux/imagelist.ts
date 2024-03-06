const CHANGE_BY = "imagelist/CHANGE_BY" as const;

export const changeBy = (diff: string[]) => ({
  type: CHANGE_BY,
  payload: diff,
});

type ImagelistAction = ReturnType<typeof changeBy>;

type ImagelistState = {
  url: string[];
};

const initialState: ImagelistState = {
  url: ["start_url"],
};

function imagelist(state: ImagelistState = initialState, action: ImagelistAction): ImagelistState {
  switch (action.type) {
    case CHANGE_BY:
      return {
        url: action.payload,
      };
    default:
      return state;
  }
}

export default imagelist;
