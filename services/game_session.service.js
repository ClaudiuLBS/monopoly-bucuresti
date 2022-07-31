import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { config } from '../config';
import RestApi from './rest.service';

const GameSessionApi = {
  async createSession(name) {
    const result = await axios.post(`${config.url}/create-session/`, { name });
    await SecureStore.setItemAsync('player_id', result.data.player_id.toString());
    const player = await RestApi.player.get(result.data.player_id);
    const gameSession = await RestApi.gameSession.get(player.game_session);

    return { player, gameSession };
  },

  async joinSession(name, code) {
    const result = await axios.post(`${config.url}/join-session/`, { name, code });
    if (result.data.error) return result.data;

    await SecureStore.setItemAsync('player_id', result.data.player_id.toString());
    const player = await RestApi.player.get(result.data.player_id);
    const gameSession = await RestApi.gameSession.get(player.game_session);

    return { player, gameSession };
  },

  async startSession(code) {
    const result = await axios.post(`${config.url}/start-session/`, { code });
    return result.data;
  },

  async endSession(code) {
    const result = await axios.post(`${config.url}/end-session/`, { code });
    return result;
  },

  async getPlayers(code) {
    const result = await axios.get(`${config.url}/all-players/${code}`);
    return result.data;
  },
};
export default GameSessionApi;
