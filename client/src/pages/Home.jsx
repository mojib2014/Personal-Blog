// import React, { useContext, useEffect } from "react";
// import { CssBaseline, Typography } from "@material-ui/core";

// import Posts from "../components/Posts";
// import Layout from "../common/Layout";
// import SnackBar from "../common/SnackBar";
// import useSnackState from "../hooks/useSnackState";
// import Spiner from "../common/Spiner";
// import { PostContext } from "../context/postContext";

// const Home = () => {
//   const { posts, loading, success, error, getPosts } = useContext(PostContext);
//   const [open, handleClose, handleOpen] = useSnackState();

//   /* eslint-disable */
//   useEffect(() => {
//     getPosts();
//   }, []);

//   useEffect(() => {
//     if (error) handleOpen();
//   }, [error]);

//   /* eslint-enable */
//   if (!success && loading) return <Spiner />;

//   if (!posts.length) return <p>There are no posts</p>;
//   return (
//     <>
//       <CssBaseline />
//       <Layout>
//         <Typography component="div" align="center">
//           <h1>Trending Posts in JavaScripit & JavaScript frameworks </h1>
//         </Typography>
//         <Posts items={posts} />
//       </Layout>
//       {error && (
//         <SnackBar
//           open={open}
//           severity={error ? "error" : "success"}
//           err={error}
//           success={success}
//           onClose={handleClose}
//         />
//       )}
//     </>
//   );
// };

// export default Home;
