import axios from "../axios";

export const eventList = () => {
    return axios.get('/events');
}

export const eventDetail = (event) => {
    return axios.get(`/events/${event}`);
}

export const uploadPhoto = ({event, data}) => {
    return axios.post(`/events/${event}/photos`, data);
}