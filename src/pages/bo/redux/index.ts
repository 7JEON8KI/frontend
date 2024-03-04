import { combineReducers } from "redux";
import changer from "./changer";
import content from "./content";
import menu from "./menu";

const rootReducer = combineReducers({
  changer,
  content,
  menu,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
