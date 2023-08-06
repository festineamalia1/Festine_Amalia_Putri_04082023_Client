import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "config/api";
import { connect } from "react-redux";
import { handleLogin } from "actions";
const LoginForm = (props) => {
  const history = useHistory();
  // const handleLogin = () => {
  //   history.push(`/home`);
  // };

  const [userName, setUserName] = useState("admin");
  const [password, setPasword] = useState("admin");

  console.log("statusLog", props.statusLog);

  // useEffect(() => {
  //   props.onHandleLogin()
  // }, []);
  const StatusLog = window.localStorage.getItem("LogStatus");
  const handleRedirect = () => {
    window.location.reload();
  };
  return (
    <Col>
      <Row>
        <Modal.Dialog>
          <Modal.Body>
            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <h1>Sign In</h1>
            </div>
            <Form>
              <Form.Label>Username</Form.Label>
              <Form.Group controlId="userName">
                <Form.Control
                  type="text"
                  name="userName"
                  required
                  placeholder="UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                />
              </Form.Group>
              <Link>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#005792",
                    border: "none",
                    color: "#FFFFFF",
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                    marginTop: "28px",
                  }}
                  onClick={() => {
                    history.push("/home");
                    props.onHandleLogin();
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Row>
    </Col>
  );
};

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

const mapDispatchprops = (dispatch) => {
  return { onHandleLogin: () => dispatch(handleLogin()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LoginForm);
