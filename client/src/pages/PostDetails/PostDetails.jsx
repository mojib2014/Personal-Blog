import React, { useContext, useEffect } from "react";
import { CssBaseline, Typography, Paper } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";

import Layout from "../../Layout/Layout";
import SmallerContainer from "../../Layout/SmallerContainer";
import Alert from "../../common/Alert";
import useStyles from "./styles";
import { PostContext } from "../../context/postContext";
import Spiner from "../../common/Spiner";
import Like from "../../common/Like";

const PostDetails = ({ match }) => {
  const { posts, error, loading, getPosts, handleLike } =
    useContext(PostContext);
  const classes = useStyles();

  /* eslint-disable */
  useEffect(() => {
    getPosts();
  }, []);

  const selectedPost = posts.filter((post) => post.id === +match.params.id)[0];

  if (loading) return <Spiner />;

  if (error)
    return <Alert errMessage={error} severity={error ? "error" : null} />;

  return (
    <>
      <CssBaseline />
      {selectedPost && (
        <Layout>
          <Typography
            component="div"
            align="center"
            variant="h1"
            className={classes.title}
          >
            {selectedPost.title}
          </Typography>
          <Typography
            component="div"
            align="center"
            variant="h5"
            className={classes.subTitle}
          >
            {selectedPost.sub_title}
          </Typography>
          <Like item={selectedPost} onLike={handleLike} />
          <Paper>
            <SmallerContainer>
              <Typography component="div" variant="body1">
                <MDEditor.Markdown source={selectedPost.body} />
              </Typography>
            </SmallerContainer>
          </Paper>
        </Layout>
      )}
    </>
  );
};

export default React.memo(PostDetails);
