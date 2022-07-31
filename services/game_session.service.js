import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { config } from '../config';
import RestApi from './rest.service';

const GameSessionApi = {
  createSession(name) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.url}/create-session/`, {
          name,
        })
        .then((result) => {
          Promise.all([
            SecureStore.setItemAsync('player_id', result.data.player_id.toString()),
          ]).then((res) => resolve(result.data));
        });
    });
  },
  joinSession(name, code) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.url}/join-session/`, {
          name,
          code,
        })
        .then((result) => {
          Promise.all([
            SecureStore.setItemAsync('player_id', result.data.player_id.toString()),
          ]).then(async (res) => {
            const player = await RestApi.player.get(result.data.player_id);
            const gameSession = await RestApi.game_session.get(player.game_session);
            resolve({ player, gameSession });
          });
        });
    });
  },
  startSession(code) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.url}/start-session/`, {
          code,
        })
        .then((result) => {
          resolve(result.data);
        });
    });
  },
  endSession(code) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.url}/end-session/`, {
          code,
        })
        .then((result) => {
          resolve(result.data);
        });
    });
  },
};
export default GameSessionApi;
