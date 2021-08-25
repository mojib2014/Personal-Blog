import React, {useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {AuthContext} from "../context/AuthProvider";

export default function Navbar() {
  const {user, getCurrentUser, logout} = useContext(AuthContext);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header className="nav-header fixed">
        <Nav>
          <LogoContainer>
            <Link className="nav-link" to="/">
              Logo
            </Link>
          </LogoContainer>
          {!user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </MenuItemDiv>
          )}
          {!user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </MenuItemDiv>
          )}
          {user && (
            <MenuItemDiv>
              <Link className="nav-link" to="#" onClick={logout}>
                Logout
              </Link>
            </MenuItemDiv>
          )}
          {user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/user/profile">
                Profile
              </Link>
            </MenuItemDiv>
          )}
          {user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/posts/new">
                Create Post
              </Link>
            </MenuItemDiv>
          )}
          {user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/login">
                My Account
              </Link>
            </MenuItemDiv>
          )}
        </Nav>
      </Header>
    </>
  );
}

const Header = styled.header`
  backface-visibility: hidden;
  background-color: #fff;
  transform: translate3d(0, 0, 0);
  transition: box-shadow 250ms;
  position: relative;
  width: 100%;
  height: 56px;
  max-height: 56px;
  z-index: 91;
  &.fixed {
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const Nav = styled.nav`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid transparent;
  display: flex;
  height: 100%;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-right: auto;
  font-size: 1rem;
`;

const MenuItemDiv = styled.div`
  margin-left: 24px;
  font-size: 1rem;
`;
