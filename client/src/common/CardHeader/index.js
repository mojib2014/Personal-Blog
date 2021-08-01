import React, { useContext, useEffect } from "react";
import { CardHeader, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";

import UserContext from "../../context/userContext";
import formatDate from "../../utils/formatDate";
import useStyles from "./styles";

export default function Cardheader({ post }) {
  const { user, getUserById } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    getUserById(post.author);
  }, [post]);

  return (
    <>
      {user && (
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.last_name ? user.last_name[0] : null}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={"@" + user.last_name}
          subheader={formatDate(user.created)}
        />
      )}
    </>
  );
}

Cardheader.propTypes = {
  post: PropTypes.object.isRequired,
};
