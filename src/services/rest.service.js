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
      if (result) return result.data;
      else return [];
    },

    async stats(id) {
      const result = await axios.get(`${config.url}/player-stats/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  gameSession: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/game-sessions/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
    async topPlayers(code) {
      const result = await axios.get(`${config.url}/top-players/${code}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
    async rules(id) {
      const result = await axios.get(`${config.url}/game-rules/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
  land: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/lands/${id}`).catch((e) => console.log(e));
      if (result) return result.data;
      else return null;
    },
  },
  property: {
    async get(id) {
      const result = await axios.get(`${config.url}/api/properties/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
    async info(id) {
      const result = await axios.get(`${config.url}/property-info/${id}`).catch((e) => null);
      if (result) return result.data;
      else return null;
    },
  },
};

export default RestApi;
