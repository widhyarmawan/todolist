import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todolist-60980.firebaseio.com/'
});

export default instance;