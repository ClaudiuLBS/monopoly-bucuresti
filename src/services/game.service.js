import axios from 'axios';
import { config } from '../config';

const GameService = {
  async findLocation(latitude, longitude, code) {
    const result = await axios
      .post(`${config.url}/find-location/`, { latitude, longitude, code })
      .catch((e) => ({ data: null }));

    return result.data;
  },

  async buyProperty(player, property) {
    const result = await axios
      .post(`${config.url}/buy-property/`, { player, property })
      .catch((e) => ({ data: null }));

    return result.data;
  },

  async bringSoldiers(player, property, count) {
    const result = await axios
      .post(`${config.url}/bring-soldiers/`, { player, property, count })
      .catch((e) => ({ data: null }));
  },

  async dropSoldiers(player, property, count) {
    const result = await axios
      .post(`${config.url}/drop-soldiers/`, { player, property, count })
      .catch((e) => ({ data: null }));

    return result.data;
  },

  async attack(player, property) {
    const result = await axios
      .post(`${config.url}/attack-property/`, { player, property })
      .catch((e) => ({ data: null }));

    return result.data;
  },

  async buyFactory(player, property) {
    const result = await axios
      .post(`${config.url}/buy-factory/`, { player, property })
      .catch((e) => ({ data: null }));

    return result.data;
  },

  async trainSoldiers(player, property, count) {
    const result = await axios
      .post(`${config.url}/train-soldiers/`, { player, property, count })
      .catch((e) => ({ data: null }));

    return result.data;
  },
};

export default GameService;
