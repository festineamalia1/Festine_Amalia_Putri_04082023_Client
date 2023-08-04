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

  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const history = useHistory();

  const [userId, setUserId] = useState("");
  const [userDataDetail, setUserDataDetail] = useState("");

  const handleShow = (id) => {
    setUserId(id);
    handleDataDetailUsers(id);
    setShow(true);
  };
  console.log("userId", userId);
  const [userData, setUserData] = useState([]);

  const baseURL = "http://localhost:8080";

  const fetchDataUsers = () => {
    axios.get(`${baseURL}/users`).then((respone) => {
      setUserData(respone.data.data);
    });
  };

  const handleDataDetailUsers = (iduser) => {
    axios.get(`${baseURL}/users/${iduser}`).then((respone) => {
      setUserDataDetail(respone.data.data[0]);
    });
  };

  const handleDelete = (iduser) => {
    axios
      .post(`${baseURL}/users/delete/${iduser}`)
      .then(function (response) {
        console.log(response);
        alert("hapus Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("hapus Data Gagal");
      });
  };

  console.log("userDataDetail", userDataDetail);
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
              <Button
                variant="success"
                className="mb-3"
                onClick={() => history.push(`/tambah`)}
              >
                Tambah
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>User Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData &&
                    userData.map((data, i) => (
                      <tr>
                        <td>{data.namalengkap}</td>
                        <td>{data.username}</td>
                        <td>{data.status}</td>
                        <td>
                          {" "}
                          <Button
                            variant="primary"
                            onClick={() => {
                              window.localStorage.setItem(
                                "Nama",
                                data.namalengkap
                              );
                              window.localStorage.setItem(
                                "User",
                                data.username
                              );
                              window.localStorage.setItem(
                                "Pass",
                                data.password
                              );
                              window.localStorage.setItem(
                                "Status",
                                data.status
                              );
                              window.localStorage.setItem("id", data.userid);
                              history.push(`/edit`);
                            }}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="info"
                            onClick={() => handleShow(data.userid)}
                          >
                            Lihat
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(data.userid)}
                          >
                            Hapus
                          </Button>{" "}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Detail Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col">Nama</div>
                      <div className="col">
                        <div>: {userDataDetail.namalengkap}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">User Name</div>
                      <div className="col">
                        <div>: {userDataDetail.username}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Status</div>
                      <div className="col">
                        <div>: {userDataDetail.status}</div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
