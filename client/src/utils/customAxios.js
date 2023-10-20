import axios from "axios";

const customAxios = axios.create({
  baseURL: "/api/v1",
});

export default customAxios;
