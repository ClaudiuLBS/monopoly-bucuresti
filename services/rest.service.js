import axios from 'axios';

import { config } from '../config';

const RestApi = {
  player: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/players/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  gameSession: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/game_sessions/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  neighbourhood: {},
  property: {},
};

export default RestApi;
