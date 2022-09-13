import axios from 'axios';

import { config } from '../config';

const RestApi = {
  player: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/players/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
    async updateLocation(id, latitude, longitude) {
      const result = await axios
        .patch(`${config.url}/api/players/${id}/`, {
          latitude,
          longitude,
        })
        .catch((e) => ({ data: null }));
      return result.data;
    },
    async properties(id) {
      const result = await axios.get(`${config.url}/properties-of/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
    async stats(id) {
      const result = await axios.get(`${config.url}/player-stats/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
  },

  gameSession: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/game-sessions/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
    async topPlayers(code) {
      const result = await axios.get(`${config.url}/top-players/${code}`).catch((e) => ({ data: null }));
      return result.data;
    },
    async rules(id) {
      const result = await axios.get(`${config.url}/game-rules/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
  },

  land: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/lands/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
  },

  property: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/properties/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
    async info(id) {
      const result = await axios.get(`${config.url}/property-info/${id}`).catch((e) => ({ data: null }));
      return result.data;
    },
  },
};

export default RestApi;
