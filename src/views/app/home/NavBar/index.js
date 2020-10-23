import React, { memo } from "react";
import { Button } from "reactstrap";
import styles from "./index.module.scss";

const NavBar = ({ handleLogout, userEmail }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.email}>{userEmail}</div>
      <Button color="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default memo(NavBar);
