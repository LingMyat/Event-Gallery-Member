import axios from "../axios";

export const eventList = () => {
    return axios.get('/events');
}

export const eventDetail = (event) => {
    return axios.get(`/events/${event}`);
}

export const eventGallery = (event) => {
    return axios.get(`/events/${event}/event-gallery`);
}

export const uploadPhoto = ({event, data}) => {
    return axios.post(`/events/${event}/photo-upload`, data);
}

export const myPhotos = (event) => {
    return axios.get(`/photos/${event}/my-photos`);
}

export const deletePhoto = (photo) => {
    return axios.delete(`/photos/${photo}/destroy`);
}