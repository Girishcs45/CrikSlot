import axios from "axios";

const api = axios.create({
    // baseURL : "http://localhost:9001"
    baseURL : "https://crikslot.onrender.com/"

});

export default api;