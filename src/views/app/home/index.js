import React from "react";
import styles from "./index.module.scss";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/actions";
import UploadFilesForm from "./UploadFilesForm";

const Home = ({ history }) => {
  const { user } = useSelector((store) => store.authUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(history));
  };
  return (
    <>
      <NavBar handleLogout={handleLogout} userEmail={user.email} />
      <div className={styles.container}>
        <div className={styles.files_wrapper}>
          <UploadFilesForm />
        </div>
      </div>
    </>
  );
};

export default Home;
