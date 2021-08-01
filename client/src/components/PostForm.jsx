import React, { useState, useReducer } from "react";
import * as Yup from "yup";
import MDEditor from "@uiw/react-md-editor";
import { TextField, Button, makeStyles } from "@material-ui/core";

import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import "../index.less";
import { postReducer, initialState } from "../reducers/postReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
  },
}));

export default function PostForm() {
  const [{ loading, success }, addPost] = useReducer(postReducer, initialState);
  const [value, setValue] = useState("");

  const schema = Yup.object().shape({
    title: Yup.string().min(5).max(255).required().label("Title"),
  });

  const handleSubmit = (values) => {
    addPost({ ...values, body: value });
  };

  const values = { title: "" };

  const [formik, handleClose, open] = UseForm(values, schema, handleSubmit);

  const classes = useStyles();

  return (
    <div className="content">
      <h1>Post Form</h1>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit} className={classes.root}>
          <TextField
            fullWidth
            id="title"
            type="text"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="sub_title"
            type="text"
            name="sub_title"
            label="Subtitle"
            value={formik.values.sub_title}
            onChange={formik.handleChange}
            error={formik.touched.sub_title && Boolean(formik.errors.sub_title)}
            helperText={formik.touched.sub_title && formik.errors.sub_title}
          />
          <MDEditor value={value} onChange={setValue} />
          <Button color="primary" variant="contained" type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
      <SnackBar
        open={open}
        err={formik.errors.title}
        severity={formik.errors.title ? "error" : "success"}
        success={success}
        onClose={handleClose}
      />
    </div>
  );
}
