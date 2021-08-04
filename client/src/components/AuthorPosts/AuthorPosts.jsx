import React from "react";
import { CssBaseline, Typography, Grid } from "@material-ui/core";

import Layout from "../../Layout/Layout";
import PostCard from "../../common/Card/PostCard";
import SnackBar from "../../common/SnackBar";
import useStyles from "./styles";
import useSnackState from "../../hooks/useSnackState";

export default function AuthorPosts({ items, error, success, author }) {
  const [open, handleClose] = useSnackState();
  const classes = useStyles();

  // if (!items.lenght) return <p>The author have no posts yet</p>;

  return (
    <>
      <CssBaseline />
      <Layout>
        <Typography component="div" align="center" className={classes.title}>
          <h1>Posts by </h1>
        </Typography>
        <Grid container spacing={2} className={classes.gridContainer}>
          {items.map((i) => (
            <Grid item xs={3} key={i.id} className={classes.gridItems}>
              <PostCard item={i} author={author} />
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
}
