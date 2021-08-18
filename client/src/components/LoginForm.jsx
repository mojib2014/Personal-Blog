import React, {useContext} from "react";
import * as Yup from "yup";
import {FaLock} from "react-icons/fa";
import {VscLoading} from "react-icons/vsc";
import {Redirect} from "react-router-dom";

import Form from "../common/Form";
import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import Input from "../common/Input";
import PrimaryButton from "../common/PrimaryButton";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "../Layout/Layout";
import Title from "../common/Title";
import {AuthContext} from "../context/AuthProvider";

const LoginForm = ({location}) => {
  const {user, loading, error, login} = useContext(AuthContext);

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
      const {state} = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      console.log("login form handleSubmit: ", ex);
    }
  };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  if (user) return <Redirect to="/" />;

  return (
    <ErrorBoundary>
      <Layout>
        <Title>Login Form</Title>
        <Form onSubmit={formik.handleSubmit}>
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
        </Form>
        <SnackBar
          err={error}
          severity={error ? "error" : "success"}
          open={open}
          onClose={handleClose}
        />
      </Layout>
    </ErrorBoundary>
  );
};

export default LoginForm;
