import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-84f7a.firebaseio.com/'
});

export default instance;