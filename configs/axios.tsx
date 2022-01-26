import axios from "axios";

const baseURL = "https://the-pulse-suite.herokuapp.com";
const instance = axios.create({ baseURL });

export default instance;
