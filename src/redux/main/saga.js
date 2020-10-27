import { call, takeEvery, put, all, fork } from "redux-saga/effects";
import { GET_ALL_FILES, SUBMIT_FILE, DELETE_FILE } from "./constants";
import {
  getAllFilesSuccess,
  getAllFilesError,
  submitFileSuccess,
  submitFileError,
  deleteFileSuccess,
  deleteFileError,
} from "./actions";
import axios from "axios";

const getAllFilesAsync = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_API}/files`);
const submitFileAsync = async (file) =>
  await axios.post(`${process.env.REACT_APP_BASE_API}/upload`, file);
const deleteFileAsync = async (id) =>
  await axios.delete(`${process.env.REACT_APP_BASE_API}/file/${id}`);

function* getAllFiles() {
  try {
    const { data } = yield call(getAllFilesAsync);
    if (data) {
      yield put(getAllFilesSuccess(data));
    }
  } catch (error) {
    yield put(getAllFilesError(error));
  }
}

function* submitFile({ payload: file }) {
  try {
    const { data } = yield call(submitFileAsync, file);
    if (data) {
      const { data } = yield call(getAllFilesAsync);
      yield put(submitFileSuccess(data));
    }
  } catch (error) {
    yield put(submitFileError(error));
  }
}

function* deleteFile({ payload: id }) {
  try {
    const { data } = yield call(deleteFileAsync, id);
    if (data) {
      const { data } = yield call(getAllFilesAsync);
      yield put(deleteFileSuccess(data));
    }
  } catch (error) {
    yield put(deleteFileError(error));
  }
}

export function* watchGetAllFiles() {
  yield takeEvery(GET_ALL_FILES, getAllFiles);
}

export function* watchSubmitFile() {
  yield takeEvery(SUBMIT_FILE, submitFile);
}

export function* watchDeleteFile() {
  yield takeEvery(DELETE_FILE, deleteFile);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllFiles),
    fork(watchSubmitFile),
    fork(watchDeleteFile),
  ]);
}
