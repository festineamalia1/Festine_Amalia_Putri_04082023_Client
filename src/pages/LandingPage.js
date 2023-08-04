import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
import NavBar from "components/NavBar";

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
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Login from "components/LoginForm"

const LandingPage = () =>{
   
    return(
        <Container className="landing">
            <Row noGutters style={{ width: "100%"}}>
                <Login/>
            </Row>
        </Container>
    );
};
export default LandingPage;