import axios from 'axios';

import { config } from '../config';

const RestApi = {
  player: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/players/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },

    async updateLocation(id, latitude, longitude) {
      const result = await axios
        .patch(`${config.url}/api/players/${id}/`, {
          latitude,
          longitude,
        })
        .catch((e) => null);
      if (result) return result.data;
      else return null;
    },

    async properties(id) {
      const result = await axios.get(`${config.url}/properties-of/${id}`).catch((e) => []);
      if (result) return result;
      else return [];
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
  property: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/properties/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
};

export default RestApi;
