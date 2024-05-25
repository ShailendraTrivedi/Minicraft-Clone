import axios from "axios";
import Cookies from "js-cookie";
import { REACT_APP_BASE_URL } from "./constants";

const InterceptorAPI = axios.create({
  baseURL: REACT_APP_BASE_URL,
  withCredentials: true,
});
InterceptorAPI.defaults.headers.common["Authorization"] = Cookies.get("token");
export default InterceptorAPI;
