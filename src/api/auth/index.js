import axios from "../../axios";

export const register = (data) => {
    return axios.post('/register', data);
}

export const login = (credentials) => {
    return axios.post('/login', credentials);
}