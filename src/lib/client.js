import axios from "axios";


const client = axios.create({
    baseURL: process.env.DEV_SERVER,
});

export default client;
