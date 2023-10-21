import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
});

customAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("t$o@k!en*");
  const authorization = token ? `Token ${token}` : "";
  config.headers.Authorization = authorization;

  return config;
});

export default customAxios;
