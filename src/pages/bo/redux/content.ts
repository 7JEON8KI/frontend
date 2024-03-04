const CONTENT_CHANGE_BY = "content/CONTENT_CHANGE_BY" as const;

export const contentChangeBy = (diff: string) => ({
  type: CONTENT_CHANGE_BY,
  payload: diff,
});

type ContentAction = ReturnType<typeof contentChangeBy>;

type ContentState = {
  content: string;
};

const initialState: ContentState = {
  content: "sample_content",
};

function changer(state: ContentState = initialState, action: ContentAction): ContentState {
  switch (action.type) {
    case CONTENT_CHANGE_BY:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
}

export default changer;
