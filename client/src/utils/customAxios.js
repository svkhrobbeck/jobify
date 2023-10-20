import axios from "axios";

const customAxios = axios.create({

customAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("t$o@k!en*");
  const authorization = token ? `Token ${token}` : "";
  config.headers.Authorization = authorization;

  return config;
});

export default customAxios;
