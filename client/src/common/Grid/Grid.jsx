import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import PostCard from "../Card/index";
import useStyles from "./styles";

export default function GridComponent({ items, onLike, onDisLike }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      {items.map((i) => (
        <Grid item xs={3} key={i.id} className={classes.gridItems}>
          <PostCard post={i} onLike={onLike} onDisLike={onDisLike} />
        </Grid>
      ))}
    </Grid>
  );
}

GridComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLike: PropTypes.func.isRequired,
};
