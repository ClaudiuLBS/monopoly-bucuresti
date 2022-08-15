import axios from 'axios';
import { config } from '../config';

const MapApi = {
  async getPaths(code) {
    const result = await axios
      .get(`${config.url}/lands-paths/${code}`)
      .catch((e) => ({ data: [] }));
    return result.data;
  },
};

export default MapApi;
