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

import { useQuery, useMutation } from "react-query";
import axios from "axios";

import Barang from "../assets/images/barang1.jpg";

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
   
    handlDetailBarang(id);
    setShow(true);
  };
  console.log("userId", userId);
  const [userData, setUserData] = useState([]);

  const [barangData, setBarangData] = useState([]);
    const [detailBarang, setDetailBarang] = useState([]);

  const fetchDataBarang = () => {
    axios
      .get(`${API}/barangs`)
      .then(function (response) {
        console.log(response);
        setBarangData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

   const handlDetailBarang = (id) => {
     axios
       .get(`${API}/barangs/${id}`)
       .then(function (response) {
         console.log(response);
         setDetailBarang(response.data.data[0]);
       })
       .catch(function (error) {
         console.log(error);
       });
   };

  const fetchDataUsers = () => {
    axios.get(`${API}/users`).then((respone) => {
      setUserData(respone.data.data);
    });
  };

  const handleDataDetailUsers = (iduser) => {
    axios.get(`${API}/users/${iduser}`).then((respone) => {
      setUserDataDetail(respone.data.data[0]);
    });
  };

  const handleDelete = (iduser) => {
    axios
      .post(`${API}/users/delete/${iduser}`)
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

  console.log("barangData", barangData);
  useEffect(() => {
    fetchDataBarang();
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
                    <th>Nama Barang</th>
                    <th>Foto Barang</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                    <th>Stok</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {barangData &&
                    barangData.map((data, i) => (
                      <tr>
                        <td>{data.nama_barang}</td>
                        <td>
                          <img src={Barang} alt="" />
                        </td>
                        <td>{data.harga_beli}</td>
                        <td>{data.harga_jual}</td>
                        <td>{data.stok}</td>
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
                            onClick={() => handleShow(data.id_barang)}
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
                        <div>: {detailBarang.nama_barang}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">User Name</div>
                      <div className="col">
                        <div>: {detailBarang.harga_beli}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">User Name</div>
                      <div className="col">
                        <div>: {detailBarang.harga_jual}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Stok</div>
                      <div className="col">
                        <div>: {detailBarang.stok}</div>
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
