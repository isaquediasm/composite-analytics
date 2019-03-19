import StorageProvider from '../helpers/storage';
import api from '../api';

const Actor = {
  async register() {
    try {
      const existingActor = this.getActor();

      if (existingActor) return Promise.resolve(existingActor);

      const actor = await api.post('/actors/');

      this._setActorId(actor);

      return Promise.resolve(actor);
    } catch (err) {
      // log here
    }
  },

  async identify(properties) {
    try {
      const currActor = this.getActor();

      if (currActor === null)
        throw new Error(
          'Please, register an actor before trying to identify it.'
        );

      const actor = await api.put(
        `/actors/${currActor.public_id}/`,
        properties
      );

      this._setActorId(actorId);

      return Promise.resolve(actorId.value);
    } catch (err) {
      // log here
    }
  },

  _setActorId(actor) {
    if (!!actor) {
      StorageProvider.setItem('actor', actor);
    }
  },

  getActor() {
    const storedActor = StorageProvider.getItem('actor');
    return storedActor.value;
  }
};

export default Actor;
