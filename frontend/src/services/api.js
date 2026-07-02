import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const loginUser = (email, password) =>
  API.post("/login", { email, password });

export const scanTarget = (target) =>
  API.post("/scan", { target });

export const getHistory = () =>
  API.get("/history");

export const downloadReport = (scanId) => {
  window.open(`http://127.0.0.1:5000/api/report/download/${scanId}`, "_blank");
};

export default API;