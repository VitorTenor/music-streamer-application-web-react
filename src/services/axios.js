import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8081/music-streamer/v1',
});
