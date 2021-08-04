import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(15),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        {children}
      </Container>
    </>
  );
}
