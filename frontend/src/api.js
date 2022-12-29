import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";

export const api = axios.create({ baseURL: API_ROOT });
/*
import axios from 'axios';

const API_ROOT = 
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4001/";

const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:4001";

const api = axios.create({baseURL: API_ROOT})
export default api;
//export const ws = new WebSocket(WS_URL);
*/
/*
const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

export default instance;
*/
// instance.get('/hi').then((data) => console.log(data));
