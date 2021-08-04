import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    flexBasis: "25%",
    maxWidth: "100%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    justifyContent: "space-between",
  },
}));

export default useStyles;
