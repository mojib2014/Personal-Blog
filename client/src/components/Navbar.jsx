import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Header className="nav-header fixed">
        <Nav>
          <LogoContainer>
            <Link className="nav-link" to="/">
              Mojib's Blog
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
              <a className="nav-link" href="/login" onClick={logout}>
                Logout
              </a>
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
              <Link className="nav-link" to="/posts/post/new">
                Create Post
              </Link>
            </MenuItemDiv>
          )}
          {user && (
            <MenuItemDiv>
              <Link className="nav-link" to="/my-account">
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
  background-color: var(--bg-color);
  transform: translate3d(0, 0, 0);
  transition: box-shadow 250ms;
  position: relative;
  width: 100%;
  height: 56px;
  max-height: 56px;
  z-index: 91;
  &.fixed {
    box-shadow: var(--box-shadow);
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const Nav = styled.nav`
  align-items: center;
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
  font-weight: 800;
  font-size: 2rem;
`;

const MenuItemDiv = styled.div`
  margin-left: 2rem;
  font-weight: 550;
`;
