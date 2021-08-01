import React, { useReducer } from "react";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import SnackBar from "../common/SnackBar";
import { authReducer, initialState } from "../store/reducers/authReducer";
import auth from "../services/authService";
import actionTypes from "../store/actions/action_types";
import history from "../utils/history";
import UseForm from "../hooks/useForm";
import actions from "../store/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
    },
  },
}));

const LoginForm = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const classes = useStyles();

  const schema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(6).required().label("password"),
  });

  const values = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(actions.loading());

      const res = await auth.login(values.email, values.password);

      if (res.status !== 200) return dispatch(actions.error(res));
      console.log("token", res);
      if (auth.getCurrentUser()) {
        history.replace("/");
      }
      // const { state } = props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (err) {
      console.log("catch: ", err);
      dispatch({ type: actionTypes.ERROR, payload: err.response });
    }
  };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  if (auth.getCurrentUser()) return <Redirect to="/" />;

  return (
    <div className="content">
      <h1 className="form-title">Login Form</h1>
      <div className="form-content">
        <form
          onSubmit={formik.handleSubmit}
          className={classes.root}
          style={{ width: "500px", margin: "auto" }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            required
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
            required
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {state.loading ? (
              <CircularProgress color="secondary" size={25} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
      <SnackBar
        err={state.error ? state.error.data : "Something failed"}
        severity={state.error ? "error" : "success"}
        success={state.success}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default LoginForm;
