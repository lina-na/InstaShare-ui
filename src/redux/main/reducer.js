import {
  GET_ALL_FILES,
  GET_ALL_FILES_SUCCESS,
  GET_ALL_FILES_ERROR,
  SUBMIT_FILE,
  SUBMIT_FILE_SUCCESS,
  SUBMIT_FILE_ERROR,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from "./constants";

const INIT_STATE = {
  allFiles: [],
  error: null,
  loading: true,
  deletetionLoading: false,
  isDeletionOver: false,
  isAdditionOver: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_FILES:
      return { ...state, loading: true, error: null };
    case GET_ALL_FILES_SUCCESS:
      return { ...state, loading: false, allFiles: action.payload };
    case GET_ALL_FILES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SUBMIT_FILE:
      return { ...state, error: null };
    case SUBMIT_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdditionOver: true,
        allFiles: action.payload,
      };
    case SUBMIT_FILE_ERROR:
      return {
        ...state,
        loading: false,
        isAdditionOver: true,
        error: action.payload,
      };
    case DELETE_FILE:
      return { ...state, deletetionLoading: true, error: null };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        deletetionLoading: false,
        isDeletionOver: true,
        allFiles: action.payload,
      };
    case DELETE_FILE_ERROR:
      return {
        ...state,
        deletetionLoading: false,
        isDeletionOver: true,
        error: action.payload,
      };
    default:
      return INIT_STATE;
  }
};
