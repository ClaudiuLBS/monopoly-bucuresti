import axios from 'axios';

import { config } from '../config';

const RestApi = {
  player: {
    get(id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${config.url}/players/${id}`)
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => resolve(null));
      });
    },
  },
  gameSession: {
    get(code) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${config.url}/game_sessions/${code}`)
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => resolve(null));
      });
    },
  },
  neighbourhood: {},
  property: {},
};

export default RestApi;
