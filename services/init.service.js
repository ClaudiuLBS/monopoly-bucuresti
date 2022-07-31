import * as SecureStore from 'expo-secure-store';

import config from '../config';
import RestApi from './rest.service';

const InitService = {
  async checkPlayer() {
    const player_id = await SecureStore.getItemAsync('player_id');
    const player = await RestApi.player.get(player_id);
    if (!player)
      return {
        player: null,
        gameSession: null,
      };
    const gameSession = await RestApi.gameSession.get(player.game_session);
    return { player, gameSession };
  },

  async deletePlayer() {
    await SecureStore.deleteItemAsync('player_id');
  },
};
export default InitService;
