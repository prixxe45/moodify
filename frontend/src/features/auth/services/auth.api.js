import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
});


export async function register({username, email, password}) {

const response = await api.post("/register", {
email,
username,
password
});

return response.data;

};

export async function login({email, username, password}) {

const response = await api.post("/login", {
  email,
  username,
  password
});

return response.data;

};

export async function getme(){
  const response = await api.get("/get-me");
  return response.data;
};


export async function logout(){
  const response = await api.get("/logout");
  return response.data;
};