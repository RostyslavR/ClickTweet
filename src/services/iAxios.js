import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const iUser = axios.create({
  baseURL: VITE_BASE_URL,
});

const setToken = (token) => {
  token
    ? (iUser.defaults.headers.authorization = `Bearer ${token}`)
    : (iUser.defaults.headers.authorization = "");
};

export { iUser, setToken };
