import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(5),
    },
  },
}));

const SnackBar = ({ err, open, severity, success, onClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={onClose} severity={severity}>
          {err
            ? err.statusText || err
            : success
            ? "Successfuly Submited"
            : "Something Failed!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
