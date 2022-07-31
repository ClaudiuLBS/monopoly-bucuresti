import axios from 'axios';

import { config } from '../config';

const RestApi = {
  player: {
    async get(id) {
      const result = await axios.get(`${config.url}/players/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  gameSession: {
    async get(code) {
      const result = await axios.get(`${config.url}/game_sessions/${code}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  neighbourhood: {},
  property: {},
};

export default RestApi;
