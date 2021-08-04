import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    alignContent: "stretch",
    alignItems: "stretch",
  },
  gridItems: {
    alignSelf: "auto",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "45%",
      flexBasis: "45%",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "25%",
      flexBasis: "25%",
    },
  },
  title: {
    marginBottom: "10%",
  },
}));

export default useStyles;
