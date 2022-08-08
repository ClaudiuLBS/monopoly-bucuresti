import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { config } from '../config';
import RestApi from './rest.service';

const GameSessionApi = {
  async createSession(name, color) {
    const token = await SecureStore.getItemAsync(config.push_token).catch((e) => null);
    const result = await axios.post(`${config.url}/create-session/`, { name, color, token });
    await SecureStore.setItemAsync(config.player_id, result.data.player_id.toString());
    const player = await RestApi.player.get(result.data.player_id);
    const gameSession = await RestApi.gameSession.get(player.game_session);

    return { player, gameSession };
  },

  async joinSession(name, code, color) {
    const token = await SecureStore.getItemAsync(config.push_token).catch((e) => null);
    const result = await axios.post(`${config.url}/join-session/`, { name, code, color, token });
    if (result.data.error) return result.data;

    await SecureStore.setItemAsync(config.player_id, result.data.player_id.toString());
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
};
export default GameSessionApi;
