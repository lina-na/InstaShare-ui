import React, { useState } from "react";
import { Form, FormGroup, CustomInput, Label, Button } from "reactstrap";
import styles from "./index.module.scss";
import axios from "axios";

const UploadFilesForm = () => {
  const [fileForUpload, setFileForUpload] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fileForUpload) {
      const formData = new FormData();
      formData.append(fileForUpload.name, fileForUpload);
      try {
        const { data } = axios.post(
          `${process.env.REACT_APP_BASE_API}/upload`,
          formData
        );
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  const handleChange = (event) => {
    setFileForUpload(event.target.files[0]);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="uploadFile" className={styles.form_label}>
          Upload Your File
        </Label>
        <CustomInput
          type="file"
          id="uploadFile"
          name="uploadFileInput"
          onChange={handleChange}
        />
      </FormGroup>
      <div className="d-flex justify-content-center mt-4">
        <Button className={styles.submit_button} color="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default UploadFilesForm;
