import axios from "../../axios";

export const register = (data) => {
    // console.log(data);
    
    return axios.post('/register', data);
}

export const login = (credentials) => {
    return axios.post('/login', credentials);
}

export const logout = () => {
    return axios.post('/logout');
}