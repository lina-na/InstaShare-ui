import React from "react";
import styles from "./index.module.scss";
import { Button, Card, CardBody } from "reactstrap";

const Row = ({
  date,
  name,
  setDeleteModalVisible,
  setEditModalVisible,
  id,
  setDeletedItemId,
}) => {
  const handleDeleteClick = () => {
    setDeleteModalVisible(true);
    setDeletedItemId(id);
  };
  return (
    <Card
      className={styles.row_outer_wrapper}
      onClick={() => setEditModalVisible(true)}
    >
      <CardBody className={styles.row_inner_wrapper}>
        <div>
          <div>{name}</div>
          <div>{date}</div>
        </div>
        <Button onClick={handleDeleteClick} color="info">
          delete
        </Button>
      </CardBody>
    </Card>
  );
};

export default Row;
