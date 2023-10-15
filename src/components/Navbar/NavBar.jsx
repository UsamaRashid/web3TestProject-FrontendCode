import React, { useState } from "react";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export default function NavBar(props) {
  const [metaMaskNotInstalled, setMetamask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      setMetamask(true);
    }
  }, [props.currentUser]);
  return (
    <>
      <Nav>
        <NavBtn>
          <NavLink to="/">
            <b>NFT Marketplace</b>
          </NavLink>
        </NavBtn>
        <Bars />
        <NavMenu>
          <NavLink to="/NFTminting">NFTminting</NavLink>
          <NavLink to="/myCollection">My Collection</NavLink>
          <NavLink to="/StakeTokens">Stake Tokens</NavLink>
          <NavLink to="/BuyTokens">Token Info</NavLink>
        </NavMenu>

        {metaMaskNotInstalled === true ? (
          props.currentUser == null && (
            <NavBtn>
              <NavBtnLink
                onClick={() =>
                  props.connect({ connector: props.connectors[0] })
                }
              >
                Connect Wallet
              </NavBtnLink>
            </NavBtn>
          )
        ) : (
          <NavBtn>
            <NavBtnLink
              onClick={() =>
                window.location.replace("https://metamask.io/download/")
              }
            >
              Download Wallet
            </NavBtnLink>
          </NavBtn>
        )}
        {!(props.currentUser == null) && (
          <NavBtn>
            <NavBtnLink2 style={{ padding: "0.5rem", textAlign: "center" }}>
              {props.currentUser.toString().slice(0, 5) +
                "..." +
                props.currentUser.toString().slice(38, 42)}
            </NavBtnLink2>
            {/* <NavBtnLink2
              // onClick={connectToMetamask}
              onClick={props.disconnect}
              style={{ padding: "0.5rem", textAlign: "center" }}
            >
              Disconnect
            </NavBtnLink2> */}
          </NavBtn>
        )}
      </Nav>
    </>
  );
}

/*
 *
 * styles
 */
export const Nav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  border-radius: 1rem;
  border-radius: 1em;
  margin: 0.8em 0.8em 0em 1em;
  height: 70px;
  ${"" /* width: 200px; */}
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.hover {
    color: #15cdfc;
  }
  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #15cdfc;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #15cdfc;
  }
`;

export const NavBtnLink2 = styled(Link)`
  border-radius: 4px;
  background: #15cdfc;
  padding: 1%;
  color: #fff;
  outline: none;
  margin: 0.5em 1em 1em 1em;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #15cdfc;
  }
`;
