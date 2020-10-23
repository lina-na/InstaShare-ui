import { combineReducers } from "redux";
import authUser from "./auth/reducer";
import mainReducer from "./main/reducer";

const reducers = combineReducers({
  authUser,
  // mainReducer,
});

export default reducers;
