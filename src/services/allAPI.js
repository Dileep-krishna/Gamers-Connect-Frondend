
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







