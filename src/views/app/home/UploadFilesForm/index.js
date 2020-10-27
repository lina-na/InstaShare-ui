import React, { useState, useEffect } from "react";
import { Form, FormGroup, CustomInput, Label, Button } from "reactstrap";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { submitFile } from "../../../../redux/main/actions";

const UploadFilesForm = () => {
  const [fileForUpload, setFileForUpload] = useState(null);
  const [keyValue, setKeyValue] = useState(Math.random() * 10);
  const dispatch = useDispatch();
  const { isAdditionOver } = useSelector((store) => store.mainReducer);

  useEffect(() => {
    if (isAdditionOver) setKeyValue((prevValue) => prevValue + 1);
  }, [isAdditionOver]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileForUpload) {
      const formData = new FormData();
      formData.append("file", fileForUpload);
      dispatch(submitFile(formData));
    }
  };
  const handleChange = (event) => {
    setFileForUpload(event.target.files[0]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="uploadFile" className={styles.form_label}>
            Upload Your File
          </Label>
          <CustomInput
            key={keyValue}
            type="file"
            id="uploadFile"
            name="uploadFileInput"
            onChange={handleChange}
          />
        </FormGroup>
        <div className="d-flex justify-content-center my-4">
          <Button
            className={styles.submit_button}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UploadFilesForm;
