import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {UserContext} from "../context/UserProvider";

export default function MobileNav() {
  const {user} = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!user && (
          <MenuItem onClick={handleClose}>
            <Link to="/login">Login</Link>
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={handleClose}>
            <Link to="/users/profile">Profile</Link>
          </MenuItem>
        )}
        {user && <MenuItem onClick={handleClose}>My account</MenuItem>}
        {user && <MenuItem onClick={handleClose}>Logout</MenuItem>}
      </Menu>
    </div>
  );
}
