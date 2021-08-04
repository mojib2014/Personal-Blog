import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    maxHeight: "100%",
    position: "relative",
    margin: "0",
    padding: "0",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: "1",
    maxWidth: "100%",
    maxHeight: "100%",
    marign: "0",
    padding: "0",
  },
  coverPhotoContainer: {
    backgroundColor: "#dddd",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: "1",
    justifySelf: "center",
    maxHeight: "500px",
    maxWidth: "100%",
    padding: "0",
  },
  avatarContainer: {
    borderRadius: "50%",
    marginTop: "-4.5%",
    width: "160px",
    height: "160px",
    padding: "0",
    border: "3.5px solid #F44336",
  },
  img: {
    width: "auto",
    height: "400px",
    objectFit: "cover",
  },
}));

export default useStyles;
