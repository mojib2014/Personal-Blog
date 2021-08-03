import React, { useContext, useEffect } from "react";
import { CssBaseline, Typography, Grid, makeStyles } from "@material-ui/core";

import Layout from "../common/Layout";
import PostCard from "../common/Card/PostCard";
import SnackBar from "../common/SnackBar";
import useSnackState from "../hooks/useSnackState";
import Spiner from "../common/Spiner";
import { PostContext } from "../context/postContext";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "stretch",
    alignItems: "stretch",
  },
  gridItems: {
    alignSelf: "auto",
  },
});

const Posts = () => {
  const { posts, loading, success, error } = useContext(PostContext);
  const [open, handleClose, handleOpen] = useSnackState();

  const classes = useStyles();

  /* eslint-disable */

  useEffect(() => {
    if (error) handleOpen();
  }, [error]);

  /* eslint-enable */
  if (!success && loading) return <Spiner />;

  if (!posts.length) return <p>There are no posts</p>;
  return (
    <>
      <CssBaseline />
      <Layout>
        <Typography component="div" align="center">
          <h1>Trending Posts in JavaScripit & JavaScript frameworks </h1>
        </Typography>
        <Grid container spacing={2} className={classes.gridContainer}>
          {posts.map((i) => (
            <Grid item xs={3} key={i.id} className={classes.gridItems}>
              <PostCard item={i} />
            </Grid>
          ))}
        </Grid>
      </Layout>
      {error && (
        <SnackBar
          open={open}
          severity={error ? "error" : "success"}
          err={error}
          success={success}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Posts;
