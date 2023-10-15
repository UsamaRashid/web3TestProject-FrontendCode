import React, { useState } from "react";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar2(props) {
  const [metaMaskNotInstalled, setMetamask] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      setMetamask(true);
    }
  }, [props.currentUser]);
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Navbar className="Nav" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="brand" to="/">
              <b>NFT Marketplace</b>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" bsStyle="tabs">
                <Nav.Link
                  onClick={() => {
                    navigate("/NFTminting");
                  }}
                >
                  NFTminting
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/myCollection");
                  }}
                >
                  My Collection
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/StakeTokens");
                  }}
                >
                  Stake Tokens
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/BuyTokens");
                  }}
                >
                  Token Info
                </Nav.Link>

                {metaMaskNotInstalled === true ? (
                  props.currentUser == null && (
                    <Nav.Link
                      onClick={() =>
                        props.connect({ connector: props.connectors[0] })
                      }
                    >
                      Connect Wallet
                    </Nav.Link>
                  )
                ) : (
                  <Nav.Link
                    onClick={() =>
                      window.location.replace("https://metamask.io/download/")
                    }
                  >
                    Download Wallet
                  </Nav.Link>
                )}

                {!(props.currentUser == null) && (
                  <NavDropdown
                    title={
                      props.currentUser.toString().slice(0, 5) +
                      "..." +
                      props.currentUser.toString().slice(38, 42)
                    }
                    id="basic-nav-dropdown"
                    className="brand"
                  >
                    <NavDropdown.Item
                      className="brand"
                      onClick={props.disconnect}
                    >
                      Disconnect
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
