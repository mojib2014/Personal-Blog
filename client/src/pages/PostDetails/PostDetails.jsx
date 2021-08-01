import React from "react";
import { CssBaseline, Typography } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";

import Layout from "../../common/Layout";
import SmallerContainer from "../../common/SmallerContainer";
import Alert from "../../common/Alert";
import useStyles from "./styles";
import usePostsState from "../../hooks/usePostsState";

export default function PostDetails({ match, error }) {
  const [{ posts }] = usePostsState();
  const classes = useStyles();

  const selectedPost = posts.filter((post) => post.id === +match.params.id)[0];

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
          <SmallerContainer>
            <Typography component="div" variant="body1">
              <MDEditor.Markdown source={selectedPost.body} />
            </Typography>
          </SmallerContainer>
        </Layout>
      )}
    </>
  );
}
