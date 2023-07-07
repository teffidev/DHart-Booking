import axios from 'axios';

export const registrarImages = (body) => axios.post("http://localhost:8081/api/assets/uploadFiles", body);