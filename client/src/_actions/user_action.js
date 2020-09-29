import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";

export function loginUser(dataTosumit) {
  const request = axios
    .post("/api/users/login", dataTosumit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER, //action 이름
    payload: request, //백앤드에서 가져온 모든 데이터를 가지고 있음
  };
}

export function registerUser(dataTosumit) {
  const request = axios
    .post("/api/users/register", dataTosumit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get("/api/users/logout")
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
