import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "reletive",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export default function Spiner(props) {
  const classes = useStylesFacebook();
  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        clasess={{ circle: classes.circle }}
        size={60}
        thickness={4}
        {...props}
      />
    </div>
  );
}
