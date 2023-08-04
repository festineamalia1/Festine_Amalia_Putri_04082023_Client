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

  const [nama, setNama] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleTambah = () => {
    axios
      .post(`${baseURL}/users`, {
        nama: nama,
        user: userName,
        pass: password,
        status: status,
      })
      .then(function (response) {
        console.log(response);
        alert("tambah Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("tambah Data Gagal");
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
                <div className="col">
                  <label>Password</label>
                  <input
                    class="form-control"
                    type="password"
                    placeholder="Passwor"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
