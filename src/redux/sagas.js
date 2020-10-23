import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import mainSaga from "./main/saga";

export default function* rootSaga() {
  yield all([authSagas(), mainSaga()]);
}
