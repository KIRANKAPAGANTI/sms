import axios from "axios";

const API = axios.create({
  baseURL: "http://13.60.104.209:8084",
});

export default API;