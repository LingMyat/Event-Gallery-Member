import axios from "axios"

let apiUrl = import.meta.env.VITE_API_URL;
if(typeof window !== 'undefined') {
    axios.defaults.baseURL = apiUrl;

    const isLogin = !!localStorage.getItem('login');

    if(isLogin) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export default axios;