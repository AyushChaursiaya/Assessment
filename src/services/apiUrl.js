import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUsers = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/users?q=${query}`);
  console.log("searchUsers:", res);
  return res.data.items;
};

export const getRepos = async (username) => {
  const res = await axios.get(`${BASE_URL}/users/${username}/repos`);
  console.log("getRepos:", res);
  return res.data;
};
