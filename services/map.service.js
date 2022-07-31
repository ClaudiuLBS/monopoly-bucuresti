import axios from 'axios';
import { config } from '../config';

const MapApi = {
  async getPaths(code) {
    const result = await axios.get(`${config.url}/neighbourhoods-paths/${code}`).catch((e) => null);
    if (result) return result.data;
    return null;
  },
};

export default MapApi;
