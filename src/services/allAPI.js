
import axios from "axios";
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
export const getAllPostsAPI = async () => {
  const token = sessionStorage.getItem("token");

  return await commonAPI(
    "GET",
    `${SERVERURL}/home-post`,
    null,
    {
      Authorization: `Bearer ${token}`
    }
  );
};

// update user profile
export const updateUserProfileAPI = async (reqBody) => {
  const token = sessionStorage.getItem("token");

  return await commonAPI(
    "PUT",
    `${SERVERURL}/profile-update`,
    reqBody,
    {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  );
};
// get user profile
export const getUserProfileAPI = async () => {
  const token = sessionStorage.getItem("token");

  return await commonAPI(
    "GET",
    `${SERVERURL}/profile`,
    null,
    {
      Authorization: `Bearer ${token}`
    }
  );
};
// ---------admin---------------------

//get all users in admin
export const adminUsersAPI = async () => {
  const token = sessionStorage.getItem("token"); // admin token

  return await commonAPI(
    "GET",
    `${SERVERURL}/get-allUsers`,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};



//admin profile edit

export const updateAdminProfileAPI = async (reqBody) => {
  const token = sessionStorage.getItem("token"); // admin token

  return await commonAPI(
    "PUT",
    `${SERVERURL}/admin/profile`,
    reqBody,
    {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  );
};


// user delete api


export const deleteUserAPI = async (id) => {
  const token = sessionStorage.getItem("token"); // admin token

  const response = await axios.delete(
    `${SERVERURL}/delete-user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

//delete


export const deletePostAPI = async (postId) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.delete(
    `${SERVERURL}/admin/delete-post/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;  // return response data directly
};
//banned user
export const toggleBanUserAPI = async (id, reason = "") => {
  const token = sessionStorage.getItem("token"); // your JWT token

  return await commonAPI(
    "PUT",
    `${SERVERURL}/ban-user/${id}`,
    { reason },
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
//banned user feedback
// banned user feedback
// USER → send feedback
export const sendBanFeedbackAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVERURL}/ban-feedback`,
    reqBody
  );
};

// ADMIN → get all feedbacks
export const getAllFeedbacksAPI = async () => {
  return await commonAPI(
    "GET",
    `${SERVERURL}/feedback/all`
  );
};

// ADMIN → reply to feedback
export const replyToFeedbackAPI = async (payload) => {
  return await commonAPI(
    "POST",
    `${SERVERURL}/feedback/reply`,
    payload
  );
};
//followers
// Example followUserAPI
export const followUserAPI = async (userId) => {
  const token = sessionStorage.getItem("token");

  if (!userId) {
    throw new Error("No target userId provided to followUserAPI");
  }

  const response = await axios.post(
    `${SERVERURL}/follow/${userId}`,
    {}, // no body required if your backend doesn't expect one
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};








