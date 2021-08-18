import React, {useState} from "react";
import * as Yup from "yup";
import styled from "styled-components";
import {MdTitle, MdSubtitles} from "react-icons/md";
import MDEditor from "@uiw/react-md-editor";
import {VscLoading} from "react-icons/vsc";

import Title from "../common/Title";
import Form from "../common/Form";
import Input from "../common/Input";
import PrimaryButton from "../common/PrimaryButton";
import Layout from "../Layout/Layout";
import SnackBar from "../common/SnackBar";
import UseForm from "../hooks/useForm";
import usePostsState from "../hooks/usePostsState";
import FileInput from "../common/FileInput";
import ErrorBoundary from "./ErrorBoundary";
import auth from "../services/authService";

export default function PostForm() {
  const {loading, error, addPost} = usePostsState();
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  const schema = Yup.object().shape({
    title: Yup.string().min(5).max(255).required().label("Title"),
    sub_title: Yup.string().min(10).required().label("Subtitle"),
  });

  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async values => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "item",
      JSON.stringify({
        ...values,
        body: value,
        cover_image: "",
        author: auth.getCurrentUser().id,
      }),
    );

    await addPost(formData);
    if (!loading) window.location = "/";
  };

  const initialValues = {title: "", sub_title: ""};

  const [formik, handleClose, open] = UseForm(
    initialValues,
    schema,
    handleSubmit,
  );

  return (
    <ErrorBoundary>
      <Layout>
        <Title>Post Form</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FileInput
            id="cover-image"
            name="cover-image"
            label="Cover Image"
            onChange={handleFileChange}
          />
          <Input
            id="title"
            type="text"
            name="title"
            label="Title"
            formik={formik}
            icon={<MdTitle />}
            placeholder="Title goes here"
          />
          <Input
            id="sub_title"
            type="text"
            name="sub_title"
            label="Subtitle"
            formik={formik}
            icon={<MdSubtitles />}
            placeholder="Subtitle goes here"
          />
          <BodyDescription>
            Use
            <MarkdownLink
              href="https://www.markdownguide.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Markdown Guide
            </MarkdownLink>
            to write and format posts.
          </BodyDescription>
          <MDEditor value={value} onChange={setValue} required />
          <PrimaryButton disabled={loading}>
            {loading ? <VscLoading size={20} /> : "Submit"}
          </PrimaryButton>
        </Form>
        <SnackBar
          open={open}
          err={error}
          severity={error ? "error" : "success"}
          onClose={handleClose}
        />
      </Layout>
    </ErrorBoundary>
  );
}

const BodyDescription = styled.p`
  color: rgba(0, 0, 0, 0.78);
  padding: 0.3rem;
`;

const MarkdownLink = styled.a`
  color: #1967d2;
  padding: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    text-decoration: underline;
  }
`;
