import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormFeedback,
} from "reactstrap";
import styles from "./index.module.scss";
import { loginUser, registerUser } from "../../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { validateRegData } from "../../../constants/defaultValues";

const Authorization = ({ history, match }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [validateErrors, setValidateErrors] = useState({});
  const [isRegisteredBefore, setIsRegisteredBefore] = useState(true);

  const dispatch = useDispatch();
  const onInputChange = (event) => {
    setValidateErrors({});
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleNotRegClick = () => {
    setValidateErrors({});
    setIsRegisteredBefore((prevValue) => !prevValue);
    setData({ email: "", password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateRegData(data);
    if (errors) {
      setValidateErrors(errors);
    } else {
      isRegisteredBefore
        ? dispatch(loginUser(data, history, match.url))
        : dispatch(registerUser(data, history, match.url));
    }
  };
  const { email, password } = data;
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.outer_wrapper}>
        <Col>
          <Card>
            <CardHeader className={styles.form_header}>
              {isRegisteredBefore ? "Login" : "Register"}
            </CardHeader>
            <CardBody className={styles.inner_wrapper}>
              <Form className="d-flex flex-column">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    invalid={!!validateErrors.email}
                    onChange={(event) => onInputChange(event)}
                  />
                  <FormFeedback invalid="true" className="z-index-2">
                    {validateErrors.email}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    invalid={!!validateErrors.password}
                    onChange={(event) => onInputChange(event)}
                  />
                  <FormFeedback invalid="true" className="z-index-2">
                    {validateErrors.password}
                  </FormFeedback>
                </FormGroup>
              </Form>
              <div className="d-flex justify-content-between">
                <Button onClick={handleNotRegClick} color="warning">
                  {isRegisteredBefore
                    ? "Not Registered Yet?"
                    : "Already Registered?"}
                </Button>
                <Button onClick={handleSubmit} color="success">
                  Submit
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default Authorization;
