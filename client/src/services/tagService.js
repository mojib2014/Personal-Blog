import http from "./httpService";

const getAllTags = () => {
  try {
    return http.get("/tags");
  } catch (err) {
    throw err;
  }
};

const getTag = (tag_id) => {
  try {
    return http.get(`/tags/${tag_id}`);
  } catch (err) {
    throw err;
  }
};

const tagService = {
  getAllTags,
  getTag,
};

export default tagService;
