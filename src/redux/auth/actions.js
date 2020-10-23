import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from "./constants";

export const loginUser = (user, history, pastUrl) => ({
  type: LOGIN_USER,
  payload: { user, history, pastUrl },
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const logoutUserSuccess = (user) => ({
  type: LOGOUT_USER_SUCCESS,
  payload: user,
});
