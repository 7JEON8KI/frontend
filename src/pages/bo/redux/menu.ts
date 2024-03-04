const CHANGE_MENU = "menu/CHANGE_BY" as const;

export const changeMenu = (diff: string) => ({
  type: CHANGE_MENU,
  payload: diff,
});

type MenuAction = ReturnType<typeof changeMenu>;

type MenuState = {
  menu: string;
};

const initialState: MenuState = {
  menu: "home",
};

function menu(state: MenuState = initialState, action: MenuAction): MenuState {
  switch (action.type) {
    case CHANGE_MENU:
      return {
        menu: action.payload,
      };
    default:
      return state;
  }
}

export default menu;
