import axios from "axios";

const api = axios.create({
    baseURL: 'https://snippethub-backend.onrender.com'
})

export default api
