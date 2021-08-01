import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
    fontSize: "2.8rem",
    fontWeight: "bold",
  },
  subTitle: {
    marginBottom: theme.spacing(10),
  },
}));

export default useStyles;
