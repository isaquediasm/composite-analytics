import api from '../api';
import Actor from './actor';

const Events = {
  async register(name = null, properties) {
    if (name === null) throw new Error('event name expected');

    const actor = Actor.getActor().public_id;
    api.post('/events/', { name, actor, properties });
  }
};

export default Events;
