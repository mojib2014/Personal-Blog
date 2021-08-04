import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/login">Loin</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/register">Register</Link>
          <Link to="/posts">Posts</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
