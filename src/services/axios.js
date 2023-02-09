import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8081/music-streamer/v1', // URL DA APLICAÇÃO A SER CONSUMIDA
});
