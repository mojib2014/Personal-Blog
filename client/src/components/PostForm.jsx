import React, {useState, useEffect} from "react";
import Joi from "joi-browser";
import styled from "styled-components";
import {FaCamera} from "react-icons/fa";
import {MdTitle, MdSubtitles} from "react-icons/md";
import {VscLoading} from "react-icons/vsc";

import Title from "../common/Title";
import Form from "../common/Form";
import Input from "../common/Input";
import PrimaryButton from "../common/PrimaryButton";
import Layout from "../Layout/Layout";
import UseForm from "../hooks/useForm";
import FileInput from "../common/FileInput";
import ErrorBoundary from "./ErrorBoundary";
import TextArea from "../common/TextArea";
import MarkdownPreview from "../common/MarkdownPreview";
import postService from "../services/postsService";
import auth from "../services/authService";
import useCreatePost from "../hooks/useCreatePost";

export default function PostForm(props) {
  const {mutate: savePost, isLoading} = useCreatePost();
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState({title: "", sub_title: "", body: ""});
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageErr, setImageErr] = useState("");

  const schema = {
    id: Joi.number(),
    author: Joi.number(),
    title: Joi.string().min(5).max(255).required().label("Title"),
    sub_title: Joi.string().min(10).required().label("Subtitle"),
    body: Joi.string().min(10).required().label("Post Body"),
    cover_image: Joi.string(),
    like_user_id: Joi.array(),
    likes: Joi.number(),
    created: Joi.date(),
    modified: Joi.date(),
  };

  const {values, validate, validateProperty} = UseForm(data, schema);

  // Handle input changes like title, sub_title and body
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

  // Handle Image(file) input change
  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const populatePosts = async () => {
    const {id} = props.match.params;
    if (id === "new") return;

    const {data: post} = await postService.getPostById(id);
    if (!post) return props.history.replace("/not-found");

    setData(post);
  };

  useEffect(() => {
    populatePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();

    if (data.cover_image === "" && !image)
      return setImageErr("Image is required");

    setErrors(errors || {});

    if (errors) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "item",
      JSON.stringify({
        ...values,
        cover_image: data.cover_image || "",
        author: auth.getCurrentUser().id,
      }),
    );

    savePost(formData);

    if (!isLoading) props.history.push("/");
  };

  return (
    <ErrorBoundary>
      <Layout>
        <Title>Post Form</Title>
        <Button onClick={handlePreview}>Preview</Button>
        {!preview ? (
          <Form style={{width: "100%"}}>
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
            <PrimaryButton type="submit" onClick={handleSubmit}>
              {isLoading ? <VscLoading size={20} /> : "Submit"}
            </PrimaryButton>
          </Form>
        ) : (
          <MarkdownPreview text={data.body} />
        )}
      </Layout>
    </ErrorBoundary>
  );
}

// const DescriptionContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

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

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #2769d3;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #ddd;
  }
`;
