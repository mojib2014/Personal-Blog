import React, { useEffect, useState } from "react";
import { CardHeader, Avatar, IconButton, Link } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";

import formatDate from "../../utils/formatDate";
import useStyles from "./styles";
import userService from "../../services/usersService";

const Cardheader = ({ item, author }) => {
  // const [author, setUser] = useState({});
  const classes = useStyles();

  // /* eslint-disable  */
  // useEffect(async () => {
  //   getUser(item.author);
  // }, [item.author]);
  // /* eslint-enable */

  // const getUser = async (id) => {
  //   const { data } = await userService.getUserById(id);
  //   setUser(data);
  // };

  return (
    <>
      {author && (
        <CardHeader
          avatar={
            <Link href={`/author/profile/${author.last_name}/${author.id}`}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {author.last_name ? author.last_name[0] : null}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={"@" + author.last_name}
          subheader={formatDate(author.created)}
        />
      )}
    </>
  );
};

Cardheader.propTypes = {
  item: PropTypes.object.isRequired,
  author: PropTypes.object,
};

export default Cardheader;
