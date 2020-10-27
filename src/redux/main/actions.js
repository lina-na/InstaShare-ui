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

export const getAllFiles = () => ({
  type: GET_ALL_FILES,
});
export const getAllFilesSuccess = (files) => ({
  type: GET_ALL_FILES_SUCCESS,
  payload: files,
});
export const getAllFilesError = (error) => ({
  type: GET_ALL_FILES_ERROR,
  payload: error,
});
export const submitFile = (file) => ({
  type: SUBMIT_FILE,
  payload: file,
});
export const submitFileSuccess = (files) => ({
  type: SUBMIT_FILE_SUCCESS,
  payload: files,
});
export const submitFileError = (error) => ({
  type: SUBMIT_FILE_ERROR,
  payload: error,
});
export const deleteFile = (id) => ({
  type: DELETE_FILE,
  payload: id,
});
export const deleteFileSuccess = (files) => ({
  type: DELETE_FILE_SUCCESS,
  payload: files,
});
export const deleteFileError = (error) => ({
  type: DELETE_FILE_ERROR,
  payload: error,
});
