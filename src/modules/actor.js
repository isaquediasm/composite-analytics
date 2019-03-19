import StorageProvider from '../helpers/storage';
import api from '../api';

const Actor = {
  async register() {
    try {
      console.log('## REGISTERING ACTOR');
      const existingActor = this.getActor();
      console.log('## EXISTSS', existingActor);

      if (existingActor) return Promise.resolve(existingActor);

      const actor = await api.post('/actors/');

      console.log(actor);
      this._setActorId(actor);

      return Promise.resolve(actor);
    } catch (err) {
      console.log('#ERROR', err);
      // log here
    }
  },

  async identify(properties) {
    try {
      const currActor = this.getActor();
      console.log('composite', '#IDENTIFY');
      if (currActor === null)
        throw new Error(
          'Please, register an actor before trying to identify it.'
        );

      const actor = await api.put(
        `/actors/${currActor.public_id}/`,
        properties
      );

      console.log('#update', actor);
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
