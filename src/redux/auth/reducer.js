import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from "./constants";
import { LOCAL_STORAGE_USER } from "../../constants/defaultValues";

const INIT_STATE = {
  user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)),
  loading: false,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload.message : null,
      };
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: action.payload, error: null };
  }
};
