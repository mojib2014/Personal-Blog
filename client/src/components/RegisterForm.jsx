import React, {useContext} from "react";
import styled from "styled-components";
import * as Yup from "yup";
import {FaUser, FaLock} from "react-icons/fa";
import {VscLoading} from "react-icons/vsc";

import PrimaryButton from "../common/PrimaryButton";
import Form from "../common/Form";
import Input from "../common/Input";
import {AuthContext} from "../context/AuthProvider";
import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "../Layout/Layout";

const RegisterForm = () => {
  const {loading, error, register, getCurrentUser} = useContext(AuthContext);

  const initialValues = {
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

  const handleSubmit = async values => {
    await register(values);

    if (getCurrentUser()) window.location = "/";
  };

  const [formik, handleClose, open] = UseForm(
    initialValues,
    schema,
    handleSubmit,
  );

  return (
    <ErrorBoundary>
      <Layout>
        <Title>Register Form</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="first_name"
            type="first_name"
            label="First Name"
            id="first_name"
            formik={formik}
            icon={<FaUser />}
            placeholder="First Name"
          />
          <Input
            name="last_name"
            type="last_name"
            label="Last Name"
            id="last_name"
            formik={formik}
            icon={<FaUser />}
            placeholder="Last Name"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            id="email"
            formik={formik}
            icon="@"
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            id="password"
            formik={formik}
            icon={<FaLock />}
            placeholder="Password"
          />
          <PrimaryButton>
            {loading ? <VscLoading color="secondary" size={25} /> : "Register"}
          </PrimaryButton>
        </Form>
        <SnackBar
          err={error}
          severity={error ? "error" : "success"}
          onClose={handleClose}
          open={open}
        />
      </Layout>
    </ErrorBoundary>
  );
};

export default RegisterForm;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
`;
