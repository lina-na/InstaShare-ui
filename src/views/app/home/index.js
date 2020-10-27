import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/actions";
import UploadFilesForm from "./UploadFilesForm";
import DeleteModal from "../../../components/common/DeleteModal";
import EditModal from '../../../components/common/EditModal';
import { getAllFiles } from "../../../redux/main/actions";
import CustomSpinner from "../../../components/common/CustomSpinner";
import { deleteFile } from "../../../redux/main/actions";
import Row from './Row';
import getDate from "../../../utils/getDate";

const Home = ({ history }) => {
  const { user } = useSelector((store) => store.authUser);
  const { allFiles, loading, deletetionLoading, error, isDeletionOver } = useSelector((store) => store.mainReducer);
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState();

  useEffect(() => {
    dispatch(getAllFiles());
  }, [formSubmitted, dispatch]);

  useEffect(() => {
    if ((!error && isDeletionOver) || !allFiles.length) {
      setDeleteModalVisible(false);
    }
  }, [error, isDeletionOver, allFiles])

  const handleLogout = () => {
    dispatch(logoutUser(history));
  };
  const handleDeleteClick = () => {
    dispatch(deleteFile(deletedItemId));
  };
  const handleCancelClick = () => {
    setDeleteModalVisible(false);
  };
  return (
    <>
      <NavBar handleLogout={handleLogout} userEmail={user.email} />
      {loading ? (
        <CustomSpinner />
      ) : (
        <div>
          <div className={styles.container}>
            <div className={styles.files_wrapper}>
              <UploadFilesForm setFormSubmitted={setFormSubmitted} />
              {allFiles && allFiles.length ? (
                allFiles.map((item, index) => (
                  <Row
                    key={index}
                    id={item._id}
                    fileName={item.file_name}
                    date={getDate(item.upload_date)}
                    name={item.original_name}
                    setDeleteModalVisible={setDeleteModalVisible}
                    setEditModalVisible={setEditModalVisible}
                    setDeletedItemId={setDeletedItemId}
                  />
                ))
              ) : (
                <div>No results found</div>
              )}

              {deleteModalVisible && (
                <DeleteModal
                  handleCancelClick={handleCancelClick}
                  handleDeleteClick={handleDeleteClick}
                  isLoading={deletetionLoading}
                />
              )}
              {editModalVisible && (
                <EditModal/>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
