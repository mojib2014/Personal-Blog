import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdTitle, MdSubtitles } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

import Title from "../common/Title";
import Form from "../common/Form";
import Input from "../common/Input";
import { PrimaryButton } from "../common/PrimaryButton";
import Layout from "../Layout/Layout";
import UseForm from "../hooks/useForm";
import FileInput from "../common/FileInput";
import ErrorBoundary from "./ErrorBoundary";
import TextArea from "../common/TextArea";
import Error from "../common/Error";
import MarkdownPreview from "../common/MarkdownPreview";
import { AuthContext } from "../context/AuthProvider";
import useTags from "../hooks/useTags";
import usePost from "../hooks/usePost";

export default function PostForm(props) {
  const { user } = useContext(AuthContext);
  const { loading, error, post, getPost, savePost } = usePost();
  const history = useHistory();
  const { tag, getTag } = useTags();
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageErr, setImageErr] = useState("");
  const [data, setData] = useState({
    title: "",
    sub_title: "",
    body: "",
    tag: "",
  });

  const schema = {
    post_id: Joi.number(),
    tag_id: Joi.number(),
    author: Joi.number(),
    title: Joi.string().min(5).max(255).required().label("Title"),
    sub_title: Joi.string().min(10).required().label("Subtitle"),
    body: Joi.string().min(10).required().label("Post Body"),
    tag: Joi.string().min(5).required().label("Tag"),
    like_user_id: Joi.array(),
    likes: Joi.number(),
    created: Joi.date(),
    modified: Joi.date(),
  };

  const { values, validate, validateProperty } = UseForm(data, schema);

  // Handle input changes like title, sub_title and body
  const handleChange = ({ target }) => {
    const err = {};
    const errorMessage = validateProperty(target);
    if (errorMessage) err[target.name] = errorMessage;
    else delete err[target.name];

    const newData = { ...data };
    newData[target.name] = target.value;

    setData(newData);
    setErrors(err);
  };

  // Handle Image(file) input change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const populatePosts = async () => {
    const { post_id } = props.match.params;
    if (post_id === "new") return;

    getPost(post_id);

    if (!post) return props.history.replace("/not-found");

    getTag(post.tag_id);

    if (post && tag) setData({ ...post, tag: tag.tag });
  };

  useEffect(() => {
    populatePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (data.cover_image === "" && !image) setImageErr("Image is required");

    if (data.cover_image && image) setImageErr({});

    setErrors(errors || {});

    if (errors) return;

    const formData = new FormData();
    formData.append("file", image);

    formData.append(
      "item",
      JSON.stringify(
        Object.assign({}, values, {
          author: user.user_id,
          cover_image: data.cover_image || "",
        }),
      ),
    );

    savePost(formData);

    if (error) return;
    if (!loading && !error) history.push("/");
  };

  return (
    <ErrorBoundary>
      <Layout style={{ marginBottom: "0px!important" }}>
        <Title>Post Form</Title>
        <Form style={{ width: "100%" }}>
          {error && <Error error={error} />}
          <FileInput
            id="cover-image"
            name="cover-image"
            label="Cover Image"
            onChange={handleFileChange}
            error={imageErr}
            icon={<FaCamera />}
          />
          <Input
            id="title"
            type="text"
            name="title"
            label="Title"
            data={data}
            icon={<MdTitle />}
            placeholder="Title goes here"
            onChange={handleChange}
            errors={errors}
          />
          <Input
            id="sub_title"
            type="text"
            name="sub_title"
            data={data}
            label="Subtitle"
            icon={<MdSubtitles />}
            placeholder="Subtitle goes here"
            onChange={handleChange}
            errors={errors}
          />
          <Input
            id="tag"
            name="tag"
            type="text"
            data={data}
            label="Tag"
            placeholder="Tag goes here"
            onChange={handleChange}
            errors={errors}
            icon={<MdSubtitles />}
          />
          <MarkdowntextContainer>
            <MarkdownText>
              Use
              <MarkdownLink
                href="https://www.markdownguide.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Markdown Guide
              </MarkdownLink>
              to write and format posts.
            </MarkdownText>
            <Preview onClick={handlePreview}>Preview</Preview>
          </MarkdowntextContainer>
          <TextArea
            id="body"
            name="body"
            label="Body"
            data={data}
            icon={<MdSubtitles />}
            rows={10}
            cols={20}
            placeholder="Enter post description here using markdown"
            onChange={handleChange}
            errors={errors}
          />
          <PrimaryButton onClick={handleSubmit}>
            {loading ? <VscLoading size={20} /> : "Submit"}
          </PrimaryButton>
        </Form>
      </Layout>
      <PreviewContainer>
        {preview && <MarkdownPreview text={data.body} />}
      </PreviewContainer>
    </ErrorBoundary>
  );
}

const MarkdownText = styled.p`
  padding: var(--spacing);
`;

const MarkdowntextContainer = styled.div`
  width: 100%;
  display: inline-flex;
`;

const MarkdownLink = styled.a`
  color: #1967d2;
  padding-left: 3px;
  padding-right: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    text-decoration: underline;
  }
`;

const Preview = styled.div`
  background-color: var(--secondary-color);
  border: 1px solid #fff;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: #fff;
  padding: 0.5rem 2rem;
  margin: var(--spacing);
  margin-left: auto;
  &:hover {
    background-color: #3bf36c;
    color: var(--text-color);
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
`;
