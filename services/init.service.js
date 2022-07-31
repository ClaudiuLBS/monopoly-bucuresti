import * as SecureStore from 'expo-secure-store';

import config from '../config';
import RestApi from './rest.service';

const InitService = {
  async handleStorageKeys() {
    const player_id = await SecureStore.getItemAsync('player_id');
    const player = await RestApi.player.get(player_id);
    const gameSession = await RestApi.gameSession.get(player.game_session);
    return { player, gameSession };
  },
  deleteAll() {
    return new Promise((resolve, reject) => {
      Promise.all([SecureStore.deleteItemAsync('player_id')])
        .then(resolve)
        .catch(reject);
    });
  },
};
export default InitService;
