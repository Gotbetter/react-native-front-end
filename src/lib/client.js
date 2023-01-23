import axios from "axios";
import SERVER_END_POINT from "../const/secret"


const client = axios.create({
    baseURL: SERVER_END_POINT,
});

client.defaults.headers.common['authorization'] = `Bearer `;

export default client;
