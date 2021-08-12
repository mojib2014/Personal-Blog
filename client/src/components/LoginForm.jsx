import React from "react";
import * as Yup from "yup";
import {FaLock} from "react-icons/fa";
import {VscLoading} from "react-icons/vsc";
import {Redirect} from "react-router-dom";

import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import Input from "../common/Input";
import useAuth from "../hooks/useAuth";
import PrimaryButton from "../common/PrimaryButton";

const LoginForm = props => {
  const {user, loading, error, login} = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(6).required().label("password"),
  });

  const values = {
    email: "",
    password: "",
  };

  const handleSubmit = async values => {
    try {
      await login(values.email, values.password);

      const {state} = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      console.log("login form handleSubmit: ", ex);
    }
  };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  if (user) return <Redirect to="/" />;

  return (
    <div className="content">
      <h1 className="form-title">Login Form</h1>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            formik={formik}
            icon="@"
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            formik={formik}
            autoComplete="current-password"
            icon={<FaLock />}
          />
          <PrimaryButton>
            {loading ? <VscLoading size={20} color="primary" /> : "Login"}
          </PrimaryButton>
        </form>
      </div>
      <SnackBar
        err={error}
        severity={error ? "error" : "success"}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default LoginForm;
