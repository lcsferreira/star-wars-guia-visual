import axios from "axios";
import { swapiUrl } from "../api/utils";

const api = axios.create({
  baseURL: swapiUrl,
});

export default api;
