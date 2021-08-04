import React, { useEffect, useContext } from "react";
import {
  CssBaseline,
  Typography,
  Grid,
  makeStyles,
  Box,
} from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostCard from "../common/Card/PostCard";
import SnackBar from "../common/SnackBar";
import useSnackState from "../hooks/useSnackState";
import Spiner from "../common/Spiner";
import { PostContext } from "../context/postContext";

const useStyles = makeStyles({
  gridContainer: {
    flexWrap: "wrap",
    alignContent: "stretch",
    alignItems: "stretch",
  },
  gridItems: {
    alignSelf: "auto",
  },
});

const Posts = () => {
  const { posts, loading, success, error, getPosts } = useContext(PostContext);
  const [open, handleClose, handleOpen] = useSnackState();

  const classes = useStyles();

  /* eslint-disable */
  useEffect(() => {
    getPosts();
  }, []);

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
          <Box fontSize="h2.fontSize" m={1}>
            Trending Posts in JavaScripit & JavaScript frameworks
          </Box>
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
