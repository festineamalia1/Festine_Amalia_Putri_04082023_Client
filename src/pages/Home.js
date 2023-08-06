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
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const [idDelete, setIdDelete] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);
  const handleOpen = () => setShow(true);
  const handleOpen2 = (id) => {
    setShow2(true);
    setIdDelete(id);
  };
  const handleOpen3 = (id) => {
    setShow3(true);
  };
  const handleOpen4 = (id) => {
    setShow4(true);
    setIdDelete(id);
  };
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

  const [nama, setNama] = useState();
  const [foto, setFoto] = useState();
  const [beli, setBeli] = useState();
  const [jual, setJual] = useState();
  const [stok, setStok] = useState();
  const [admin, setAdmin] = useState();
   const [searchData, setSearchData] = useState();

  const namaBrgEdit = window.localStorage.getItem("Nama");
  const fotoBrgEdit = window.localStorage.getItem("Nama");
  const beliBrgEdit = window.localStorage.getItem("Beli");
  const jualBrgEdit = window.localStorage.getItem("Jual");
  const stokBrgEdit = window.localStorage.getItem("Stok");

  const [namaEdit, setNamaEdit] = useState(namaBrgEdit ? namaBrgEdit : "");
  const [fotoEdit, setFotoEdit] = useState(fotoBrgEdit ? fotoBrgEdit : "");
  const [beliEdit, setBeliEdit] = useState(beliBrgEdit ? beliBrgEdit : "");
  const [jualEdit, setJualEdit] = useState(jualBrgEdit ? jualBrgEdit : "");
  const [stokEdit, setStokEdit] = useState(stokBrgEdit ? stokBrgEdit : "");
  const [adminEdit, setAdminEdit] = useState();

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

  const handleSearchBarang = () => {
    axios
      .get(`${API}/search/${searchData}`)
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

  const handleTambah = () => {
    axios
      .post(`${API}/barangs`, {
        namabarang: nama,
        foto: "barang5.jpg",
        beli: beli,
        jual: jual,
        stok: stok,
        admin: 1,
      })
      .then(function (response) {
        console.log(response);
        alert("tambah Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };

  const handleEdit = () => {
    axios
      .post(`${API}/barangs/edit/${idDelete}`, {
        namabarang: namaEdit,
        foto: files.name,
        beli: beliEdit,
        jual: jualEdit,
        stok: stokEdit,
        admin: 1,
      })
      .then(function (response) {
        console.log(response);
        alert("tambah Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal. Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };

  const handleDelete = () => {
    axios
      .post(`${API}/barangs/delete/${idDelete}`)
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

  const [files, setFiles] = useState();

  const onChangeFiles = (e) => {
    console.log("file", e.target.files[0]);
    setFiles(e.target.files[0]);
  };

  console.log("barangData", barangData);
  useEffect(() => {
    fetchDataBarang();
  }, []);

  console.log("searchData", searchData);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="row mt-5">
              <NavBar />
            </div>

            <div className="mt-5">
              <div className="row">
                <div className="col col-auto">
                  <Button
                    variant="success"
                    className="mb-3"
                    onClick={() => handleOpen3()}
                  >
                    Tambah
                  </Button>
                </div>
                <div className="col">
                  <Form>
                    <Form.Group controlId="Search">
                      <Form.Control
                        type="text"
                        name="Search"
                        required
                        placeholder="Search"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="col col-auto">
                  <Button
                    variant="warning"
                    className="mb-3"
                    onClick={() => handleSearchBarang()}
                  >
                    Search
                  </Button>
                </div>
              </div>

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
                          <img
                            src={require(`../assets/images/${
                              data.foto_barang
                                ? data.foto_barang
                                : `barang1.jpg`
                            }`)}
                            alt=""
                            className="img-barang"
                          />
                        </td>
                        <td>{data.harga_beli}</td>
                        <td>{data.harga_jual}</td>
                        <td>{data.stok}</td>
                        <td>
                          {" "}
                          <Button
                            variant="primary"
                            onClick={() => {
                              // window.localStorage.setItem(
                              //   "Nama",
                              //   data.nama_barang
                              // );
                              // window.localStorage.setItem(
                              //   "Beli",
                              //   data.harga_beli
                              // );
                              // window.localStorage.setItem(
                              //   "Jual",
                              //   data.harga_jual
                              // );
                              // window.localStorage.setItem("Stok", data.stok);

                              setNamaEdit(data.nama_barang);
                              setFotoEdit(data.foto_barang);
                              setBeliEdit(data.nama_barang);
                              setJualEdit(data.harga_jual);
                              setStokEdit(data.stok);
                              // window.localStorage.setItem("id", data.userid);
                              // history.push(`/edit`);
                              handleOpen4(data.id_barang);
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
                            onClick={() => handleOpen2(data.id_barang)}
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
                    <div className=" row ">
                      <div className="d-flex col justify-contents-center align-items-center">
                        <img
                          src={require(`../assets/images/${
                            detailBarang.foto_barang
                              ? detailBarang.foto_barang
                              : "barang5.jpg"
                          }`)}
                          alt=".."
                          className="img-barang"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">Nama Barang</div>
                      <div className="col">
                        <div>: {detailBarang.nama_barang}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Harga Beli</div>
                      <div className="col">
                        <div>: {detailBarang.harga_beli}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Harga Jual</div>
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

              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className=" row ">
                      <div className="d-flex col justify-contents-center align-items-center">
                        <div>Anda Yakin akan Menghapus data barang ini ?</div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex row justify-contents-center align-items-center">
                    <Button
                      variant="info"
                      onClick={handleClose2}
                      className="mr-2"
                    >
                      Cancel
                    </Button>

                    <Button variant="danger" onClick={() => handleDelete()}>
                      Hapus
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>

              <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                  <Modal.Title>Tambah Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <label>Nama Barang</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Nama Barang"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        ></input>
                      </div>
                      <div className="col">
                        <div className="row">
                          <label>Foto Barang</label>
                          <div class="input-group mb-3">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="inputGroupFile02"
                                onChange={(e) => {
                                  onChangeFiles(e);
                                }}
                              />
                              <label
                                class="custom-file-label"
                                for="inputGroupFile02"
                              >
                                {files ? files.name : "Choose file"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {" "}
                          <span className="eror">
                            {files && files.size > 100000
                              ? "maksimal foto 100KB"
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label>Harga Beli</label>
                        <input
                          class="form-control"
                          type="number"
                          placeholder="0"
                          value={beli}
                          onChange={(e) => setBeli(e.target.value)}
                        ></input>
                      </div>
                      <div className="col">
                        <label>Harga Jual</label>
                        <input
                          class="form-control"
                          type="number"
                          placeholder="0"
                          value={jual}
                          onChange={(e) => setJual(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="row mt-4 px-3">
                      <label>Stok</label>
                      <input
                        class="form-control"
                        type="number"
                        placeholder="0"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex row justify-contents-center align-items-center">
                    <Button
                      variant="light"
                      onClick={handleClose3}
                      className="mr-2"
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="success"
                      onClick={() => handleTambah()}
                      disabled={files && files.size > 100000 ? true : false}
                    >
                      Tambah
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>

              <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <label>Nama Barang</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Nama Barang"
                          value={namaEdit}
                          onChange={(e) => setNamaEdit(e.target.value)}
                        ></input>
                      </div>

                      <div className="col">
                        <div className="row">
                          <label>Foto Barang</label>
                          <div class="input-group mb-3">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="inputGroupFile02"
                                onChange={(e) => {
                                  onChangeFiles(e);
                                }}
                              />
                              <label
                                class="custom-file-label"
                                for="inputGroupFile02"
                              >
                                {files ? files.name : "Choose file"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row">
                            {" "}
                            <span className="eror">
                              {files && files.size > 100000
                                ? "maksimal foto 100KB"
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label>Harga Beli</label>
                        <input
                          class="form-control"
                          type="number"
                          placeholder="0"
                          value={beliEdit}
                          onChange={(e) => setBeliEdit(e.target.value)}
                        ></input>
                      </div>
                      <div className="col">
                        <label>Harga Jual</label>
                        <input
                          class="form-control"
                          type="number"
                          placeholder="0"
                          value={jualEdit}
                          onChange={(e) => setJualEdit(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="row mt-4 px-3">
                      <label>Stok</label>
                      <input
                        class="form-control"
                        type="number"
                        placeholder="0"
                        value={stokEdit}
                        onChange={(e) => setStokEdit(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex row justify-contents-center align-items-center">
                    <Button
                      variant="light"
                      onClick={handleClose4}
                      className="mr-2"
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => handleEdit()}
                      disabled={files && files.size > 100000 ? true : false}
                    >
                      Edit
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
