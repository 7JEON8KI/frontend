import { combineReducers } from "redux";
import changer from "./changer";
import content from "./content";
import menu from "./menu";
import imagelist from "./imagelist";
import banner from "./banner";

const rootReducer = combineReducers({
  changer,
  content,
  menu,
  imagelist,
  banner,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
