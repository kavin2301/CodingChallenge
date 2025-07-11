import axios from "axios";

export function setAuthHeader(username, password) {
  const token = btoa(`${username}:${password}`);
  axios.defaults.headers.common["Authorization"] = `Basic ${token}`;
}

export function clearAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}
