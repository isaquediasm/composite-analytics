import config from '../config.js';

const PREFIX = config.storage_prefix;
const provider = window.localStorage;

const StorageProvider = {
  setItem(name, value) {
    const parsedValue = {
      created_at: new Date(),
      type: typeof value,
      value: typeof value === 'object' ? JSON.stringify(value) : value
    };

    provider.setItem(this._generateName(name), JSON.stringify(parsedValue));
  },

  getItem(name) {
    const data = provider.getItem(this._generateName(name));
    const parsed = JSON.parse(data);
    return data
      ? {
          ...parsed,
          value:
            parsed.type === 'object' ? JSON.parse(parsed.value) : parsed.value
        }
      : {
          value: null
        };
  },

  clear() {},

  /**
   * Generates the item data with the prefix
   * data as well
   * @param {string} name The item name
   * @protected
   * @return {string}
   */
  _generateName(name) {
    return `${PREFIX}${name}`;
  }
};

export default StorageProvider;
