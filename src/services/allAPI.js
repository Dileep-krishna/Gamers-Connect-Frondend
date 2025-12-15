import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

// register
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVERURL}/register`, reqBody);
};

// login
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVERURL}/login`, reqBody);
};

// create post
export const postCreateAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVERURL}/create-post`, reqBody, reqHeader);
};

// ✅ get all posts
export const getAllPostsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVERURL}/posts`, "", reqHeader);
};
