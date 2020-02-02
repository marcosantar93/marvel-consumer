import { combineReducers } from "redux";
import comicsReducer from "./comicsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  comics: comicsReducer,
  auth: authReducer
});
