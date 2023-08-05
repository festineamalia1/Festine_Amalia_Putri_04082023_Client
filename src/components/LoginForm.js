import React, { useState } from "react";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "config/api";
const LoginForm = () => {
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
                />
              </Form.Group>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
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
export default LoginForm;
