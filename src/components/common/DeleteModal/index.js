import React, { useRef, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import styles from "./index.module.scss";


const DeleteModal = ({ handleDeleteClick, handleCancelClick, isLoading }) => {

  const useOutsideClick = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target))
        handleCancelClick();
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  
  const outerContainer = useRef(null);
  useOutsideClick(outerContainer);
  return (
    <div className={styles.modal_outer_container}>
        <div ref={outerContainer} className={styles.modal_inner_container}>
          <div>
            <p className={styles.modal_header}>
              Are you sure you want to delete this file?
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <Button onClick={handleDeleteClick} color="danger" size="lg" className={styles.modal_delete_button}>
              {isLoading ? <Spinner size='sm'/> : 'Delete'}
            </Button>
            <Button onClick={handleCancelClick} size="lg">
              Cancel
            </Button>
          </div>
        </div>
    </div>
  );
};

export default DeleteModal;
