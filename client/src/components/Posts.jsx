// import React from "react";
// import PropTypes from "prop-types";
// import { Grid, makeStyles } from "@material-ui/core";
// import PostCard from "../common/Card/PostCard";

// const useStyles = makeStyles({
//   gridContainer: {
//     alignContent: "stretch",
//     alignItems: "stretch",
//   },
//   gridItems: {
//     alignSelf: "auto",
//   },
// });

// export default function Posts({ items }) {
//   const classes = useStyles();
//   return (
//     <Grid container spacing={2} className={classes.gridContainer}>
//       {items.map((i) => (
//         <Grid item xs={3} key={i.id} className={classes.gridItems}>
//           <PostCard item={i} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// Posts.propTypes = {
//   items: PropTypes.array.isRequired,
// };
