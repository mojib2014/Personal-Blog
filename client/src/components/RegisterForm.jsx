import React, {useContext} from "react";
import * as Yup from "yup";
import {FaUser, FaLock} from "react-icons/fa";
import {VscLoading} from "react-icons/vsc";

import PrimaryButton from "../common/PrimaryButton";
import Input from "../common/Input";
import {UserContext} from "../context/UserProvider";
import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import auth from "../services/authService";

const RegisterForm = () => {
  const {loading, success, error, register} = useContext(UserContext);

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

  const handleSubmit = async values => {
    register(values);
    if (auth.getCurrentUser()) window.location = "/";
  };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  return (
    <div className="content">
      <h1 className="form-title">Register Form</h1>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="first_name"
            type="first_name"
            label="First Name"
            id="first_name"
            formik={formik}
            icon={<FaUser />}
          />
          <Input
            name="last_name"
            type="last_name"
            label="Last Name"
            id="last_name"
            formik={formik}
            icon={<FaUser />}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            id="email"
            formik={formik}
            icon="@"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            id="password"
            formik={formik}
            icon={<FaLock />}
          />
          <PrimaryButton>
            {loading ? <VscLoading color="secondary" size={25} /> : "Register"}
          </PrimaryButton>
        </form>
      </div>
      <SnackBar
        err={error}
        success={success}
        severity={error ? "error" : "success"}
        onClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default RegisterForm;
