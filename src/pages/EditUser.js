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

export default function Home() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const history = useHistory();

  const handleShow = () => setShow(true);
  const [userData, setUserData] = useState([]);

  const baseURL = "http://localhost:8080";

  const fetchDataUsers = () => {
    axios.get(`${baseURL}/users`).then((respone) => {
      setUserData(respone.data.data);
    });
  };

  const namaLocal = window.localStorage.getItem("Nama");
  const UserName = window.localStorage.getItem("User");
  const Pass = window.localStorage.getItem("Pass");
  const Status = window.localStorage.getItem("Status");

  const Id = window.localStorage.getItem("id");

  const [nama, setNama] = useState(namaLocal ? namaLocal : "");
  const [userName, setUserName] = useState(UserName ? UserName : "");
  const [password, setPassword] = useState(Pass ? Pass : "");
  const [status, setStatus] = useState(Status ? Status : "");

  const handleTambah = () => {
    axios
      .post(`${baseURL}/users/edit/${Id}`, {
        nama: nama,
        user: userName,
        pass: password,
        status: status,
      })
      .then(function (response) {
        console.log(response);
        alert("edit Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("edit Data Gagal");
      });
  };
  console.log("userData", userData);
  useEffect(() => {
    fetchDataUsers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="row mt-5">
              <NavBar />
            </div>

            <div className="mt-5">
              <div className="row mt-5 px-3">
                <label>Nama User</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nama User"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                ></input>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>Username</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row mt-4 px-3">
                <label>Status</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                ></input>
              </div>
              <div className="row mt-5 ">
                <div className="col col-auto">
                  <Button variant="primary" onClick={() => handleTambah()}>
                    Submit
                  </Button>
                </div>
                <div className="col">
                  <Button
                    variant="danger"
                    onClick={() => history.push(`/home`)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
