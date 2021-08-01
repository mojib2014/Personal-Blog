import React, { useEffect } from "react";
import { CssBaseline, Typography } from "@material-ui/core";

import usePostsState from "../hooks/usePostsState";
import useSnackState from "../hooks/useSnackState";
import Layout from "../common/Layout";
import GridComponent from "../common/Grid/Grid";
import SnackBar from "../common/SnackBar";
import Loading from "../common/Loading";

const Home = () => {
  const [{ posts, error, loading, success }, , handleLike, handleDisLike] =
    usePostsState();
  const [open, handleClose, handleOpen] = useSnackState();

  useEffect(() => {
    if (error) handleOpen();
  }, [error]);

  if (!success && loading) return <Loading />;
  return (
    <>
      <CssBaseline />
      <Layout>
        <Typography component="div" align="center">
          <h1>Trending Posts in JavaScripit & JavaScript frameworks </h1>
        </Typography>
        <GridComponent
          items={posts}
          onLike={handleLike}
          onDisLike={handleDisLike}
        />
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

export default Home;
