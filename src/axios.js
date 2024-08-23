import axios from "axios"

let apiUrl = import.meta.env.VITE_API_URL;

if(typeof window !== 'undefined') {
    axios.defaults.baseURL = apiUrl;
}

export default axios;