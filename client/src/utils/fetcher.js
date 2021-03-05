import axios from 'axios';

const fetcher = axios.create({
  timeout: 0,
  responseType: 'json',
  maxRedirects: 0
});

export default fetcher;
