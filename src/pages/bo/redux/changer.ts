const CHANGE_BY = "changer/CHANGE_BY" as const;

export const changeBy = (diff: string) => ({
  type: CHANGE_BY,
  payload: diff,
});

type ChangerAction = ReturnType<typeof changeBy>;

type ChangerState = {
  url: string;
};

const initialState: ChangerState = {
  url: "start_url",
};

function changer(state: ChangerState = initialState, action: ChangerAction): ChangerState {
  switch (action.type) {
    case CHANGE_BY:
      return {
        url: action.payload,
      };
    default:
      return state;
  }
}

export default changer;
