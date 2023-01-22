import axios from "axios";


const client = axios.create({
    baseURL: SERVER_END_POINT,
});

client.defaults.headers.common['authorization'] = `Bearer `;

export default client;
