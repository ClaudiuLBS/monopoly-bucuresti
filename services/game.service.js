import axios from 'axios';
import { config } from '../config';

const GameService = {
  async findLocation(latitude, longitude, code) {
    const result = await axios
      .post(`${config.url}/find-location/`, { latitude, longitude, code })
      .catch((e) => ({
        property: null,
        name: null,
        price: null,
        owner: null,
      }));

    return result.data;
  },

  async buyProperty(player, property) {
    const result = await axios
      .post(`${config.url}/buy-property/`, { player, property })
      .catch((e) => ({ property_id: null }));

    return result.data;
  },

  async bringSoldiers(player, property, count) {
    const result = await axios
      .post(`${config.url}/bring-soldiers/`, { player, property, count })
      .catch((e) => ({ soldiers: null }));

    return result.data;
  },

  async dropSoldiers(player, property, count) {
    const result = await axios
      .post(`${config.url}/drop-soldiers/`, { player, property, count })
      .catch((e) => ({ soldiers: null }));

    return result.data;
  },

  async attack(player, property) {
    const result = await axios
      .post(`${config.url}/attack-property/`, { player, property })
      .catch((e) => ({ win: undefined }));

    return result.data;
  },
};

// path('find-location/', find_location, name='find-location'),
// path('buy-property/', buy_property, name='buy-property'),
// path('attack-property/', attack_property, name='attack-property'),
// path('bring-soldiers/', bring_soldiers, name='bring-soldiers'),
// path('drop-soldiers/', drop_soldiers, name='drop-soldiers'),
export default GameService;
