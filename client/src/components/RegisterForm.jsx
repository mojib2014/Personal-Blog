import React, { useState, useContext } from "react";
import styled from "styled-components";
import Joi from "joi-browser";
import { FaUser, FaLock } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { PrimaryButton } from "../common/PrimaryButton";
import Form from "../common/Form";
import Input from "../common/Input";
import UseForm from "../hooks/useForm";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "../Layout/Layout";
import Error from "../common/Error";
import { AuthContext } from "../context/AuthProvider";

const RegisterForm = () => {
  const { register, user, error, loading } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const schema = {
    first_name: Joi.string().min(4).max(20).required().label("First Name"),
    last_name: Joi.string().min(4).max(20).required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("password"),
  };

  const { values, validate, validateProperty } = UseForm(data, schema);

  const handleChange = ({ target }) => {
    const errs = {};
    const errorMessage = validateProperty(target);

    if (errorMessage) errs[target.name] = errorMessage;
    else delete errs[target.name];

    const newData = { ...data };
    newData[target.name] = target.value;

    setData(newData);
    setErrors(errs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors);
    if (errors) return;

    register(values);

    setData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };

  if (user) window.location = "/";
  return (
    <ErrorBoundary>
      <Layout>
        <Title>Register Form</Title>
        <Form>
          {error && <Error error={error} />}
          <Input
            id="first_name"
            name="first_name"
            type="first_name"
            label="First Name"
            data={data}
            icon={<FaUser />}
            onChange={handleChange}
            errors={errors}
            placeholder="First Name"
          />
          <Input
            id="last_name"
            name="last_name"
            type="last_name"
            label="Last Name"
            data={data}
            icon={<FaUser />}
            onChange={handleChange}
            errors={errors}
            placeholder="Last Name"
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            icon="@"
            data={data}
            onChange={handleChange}
            errors={errors}
            placeholder="example@email.com"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            id="password"
            data={data}
            icon={<FaLock />}
            onChange={handleChange}
            errors={errors}
            placeholder="Password"
          />
          <PrimaryButton onClick={handleSubmit}>
            {loading ? <VscLoading size={25} /> : "Register"}
          </PrimaryButton>
        </Form>
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
