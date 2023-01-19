import axios from "axios";


const client = axios.create({
    baseURL: `http://14.36.131.85:8080`
});

client.defaults.headers.common['authorization'] = `Bearer `;

export default client;
