import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Navbar,
  Nav,
  NavDropdown,
  ListGroup,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Profil from "assets/images/usernav.png";
import Logout from "assets/images/logout.svg";
import { API } from "config/api";

import { useQuery, useMutation } from "react-query";
const NavBar = (props) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const history = useHistory();

  return (
    <>
      {/* isLoading || !chanels.chanels ? ( // <h1>Loading...</h1>
      ) : error ? ( // <h1>error {error.message} </h1>
       ) : */}
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          style={{
            backgroundColor: "#0B0B0B",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
          }}
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <div style={{ marginTop: 20, marginLeft: 250, width: "550px" }}>
               
              </div>
            </Nav>
            <Nav>
              <Nav.Link href="#">
                <div className="row">
                  <div className="col-sm-3"></div>
                  {/* <div className="col">Add Video</div> */}
                </div>
              </Nav.Link>

              <Button ref={target} onClick={() => setShow(!show)}>
                Menu
              </Button>

              <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <Nav style={{ color: "white" }}>
                      <Nav.Link
                        onClick={() => {
                          history.push(`/`);
                        }}
                      >
                        <div className="row">
                          <div className="col-sm-2">
                            <img src={Logout} className="" alt="Buku1" />
                          </div>
                          <div
                            className="col"
                            style={{
                              color: "#FFFFFF",
                            }}
                          >
                            Log Out
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav>
                  </Tooltip>
                )}
              </Overlay>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(NavBar);