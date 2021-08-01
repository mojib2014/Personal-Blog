import React, { useContext } from "react";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

import UserContext from "../context/userContext";
import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
    },
  },
}));

const RegisterForm = () => {
  const { loading, success, error, register } = useContext(UserContext);
  const classes = useStyles();

  const values = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const schema = Yup.object().shape({
    first_name: Yup.string().min(4).max(20).required().label("First Name"),
    last_name: Yup.string().min(4).max(20).required().label("Last Name"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(6).required().label("password"),
  });

  const handleSubmit = (values) => {
    register(values);
  };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  return (
    <div className="content">
      <h1 className="form-title">Register Form</h1>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit} className={classes.root}>
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            type="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            type="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit" fullWidth>
            {loading ? (
              <CircularProgress color="secondary" size={25} />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
      <SnackBar
        err={error.data ? error.data : "Something failed"}
        success={success}
        severity={error ? "error" : "success"}
        onClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default RegisterForm;
