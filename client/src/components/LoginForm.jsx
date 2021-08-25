import React, {useState, useContext} from "react";
import Joi from "joi-browser";
import {FaLock, FaMailBulk} from "react-icons/fa";
import {VscLoading} from "react-icons/vsc";
import {Redirect} from "react-router-dom";

import Form from "../common/Form";
import UseForm from "../hooks/useForm";
import Input from "../common/Input";
import PrimaryButton from "../common/PrimaryButton";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "../Layout/Layout";
import Title from "../common/Title";
import {AuthContext} from "../context/AuthProvider";

const LoginForm = ({location}) => {
  const {user, loading, login} = useContext(AuthContext);
  const [data, setData] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(20).required().label("password"),
  };

  const {values, validate, validateProperty} = UseForm(data, schema);

  const handleChange = ({target}) => {
    const err = {};
    const errorMessage = validateProperty(target);
    if (errorMessage) err[target.name] = errorMessage;
    else delete err[target.name];

    const newData = {...data};
    newData[target.name] = target.value;

    setData(newData);
    setErrors(err);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();

    setErrors(errors || {});

    if (errors) return;

    try {
      await login(values.email, values.password);
      const {state} = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      console.log("login form handleSubmit: ", ex);
    }
  };

  if (user) return <Redirect to="/" />;

  return (
    <ErrorBoundary>
      <Layout>
        <Title>Login Form</Title>
        <Form>
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            data={data}
            onChange={handleChange}
            icon={<FaMailBulk />}
            errors={errors}
            placeholder="example@email.com"
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            data={data}
            autoComplete="current-password"
            icon={<FaLock />}
            onChange={handleChange}
            errors={errors}
            placeholder="Your password here"
          />
          <PrimaryButton onClick={handleSubmit}>
            {loading ? <VscLoading size={20} /> : "Login"}
          </PrimaryButton>
        </Form>
      </Layout>
    </ErrorBoundary>
  );
};

export default LoginForm;
