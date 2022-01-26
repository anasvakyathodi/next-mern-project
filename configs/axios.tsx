import axios from "configs/axios";

const baseURL = "https://the-pulse-suite.herokuapp.com";
const instance = axios.create({ baseURL });

export default instance;
