import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./constants";
import { loginUserSuccess, loginUserError, logoutUserSuccess } from "./actions";
import {
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN_NAME,
} from "../../constants/defaultValues";

const setLocalData = ({ user, accessToken = {} }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;
  localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, accessToken.token);
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
};

const loginWithEmailAsync = async (email, password) => {
  try {
    const { data } = axios.post(`${process.env.REACT_APP_BASE_API}/signin`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const clearLocalData = () => {
  axios.defaults.headers.common.Authorization = null;
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  localStorage.removeItem(LOCAL_STORAGE_USER);
};

function* loginWithEmail({ payload }) {
  const { password, email } = payload.user;
  const { history, pastUrl } = payload;
  try {
    const data = yield call(loginWithEmailAsync, email, password);
    if (data) {
      const { user, authData } = data;
      if (user && authData && authData.accessToken) {
        setLocalData(user, authData);
        yield put(loginUserSuccess(user));
        history.push(pastUrl || "/");
      } else {
        yield put(loginUserError(data.response.data.error.message));
      }
    } else {
      yield put(loginUserError("Error."));
    }
  } catch (error) {
    console.error("Login error : ", error);
  }
}

function* logout({ payload: { history } }) {
  try {
    yield put(logoutUserSuccess(null));
    clearLocalData();
    history.push("/");
  } catch (error) {
    console.error("logout failed :", error);
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmail);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
