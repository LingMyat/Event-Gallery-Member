import axios from "../../axios";

exports.eventList = () => {
    return axios.get('/events');
}

exports.eventDetail = (event) => {
    return axios.get(`/events/${event}`);
}

exports.uploadPhoto = ({event, data}) => {
    return axios.post(`/events/${event}/photos`, data);
}