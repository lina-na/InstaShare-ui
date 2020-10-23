import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./constants";
import {
  loginUserSuccess,
  loginUserError,
  logoutUserSuccess,
  registerUserSuccess,
  registerUserError,
} from "./actions";
import {
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN,
} from "../../constants/defaultValues";

const setLocalData = (user, token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
};

const clearLocalData = () => {
  axios.defaults.headers.common.Authorization = null;
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_USER);
};

const registerWithEmailAsync = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API}/signup`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const loginWithEmailAsync = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API}/signin`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

function* registerWithEmail({ payload }) {
  const { password, email } = payload.user;
  const { history } = payload;
  try {
    const data = yield call(registerWithEmailAsync, email, password);
    if (data) {
      const { token, user } = data;
      if (user && token) {
        setLocalData(user, token);
        yield put(registerUserSuccess(user));
        history.push("/");
      } else {
        yield put(registerUserError(data));
      }
    } else {
      yield put(registerUserError("Error."));
    }
  } catch (error) {
    console.error("Login error : ", error);
  }
}

function* loginWithEmail({ payload }) {
  const { password, email } = payload.user;
  const { history } = payload;
  try {
    const data = yield call(loginWithEmailAsync, email, password);

    if (data) {
      const { authorization, user } = data;
      if (user && authorization) {
        setLocalData(user, authorization);
        yield put(loginUserSuccess(user));
        history.push("/");
      } else {
        yield put(loginUserError(data));
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

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmail);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
  ]);
}
