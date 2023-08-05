import React, { useEffect, useState } from "react";
import moment from "moment";
import { API } from "config/api";

import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import Login from "components/LoginForm";

import { connect } from "react-redux";
import { fetchData } from "actions";

const LandingPage = (props) => {
  useEffect(() => {}, []);

  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <Login />
      </Row>
    </Container>
  );
};

const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error };
};

const mapDispatchprops = (dispatch) => {
  return { onFetchData: () => dispatch(fetchData()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LandingPage);
