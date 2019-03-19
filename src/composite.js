import Actor from './modules/actor';
import Events from './modules/events';

const ENV = window || global;

/**
 * Analytics class that is desined to collect events that are captured
 * for later processing.
 */

class Composite {
  /**
   * Returns a Composite instance
   * @param {object} config object to instantiate the Composite tool
   */
  constructor(appKey) {
    try {
      if (!appKey) throw new Error('appKey expected');

      this.actor = {};
      this.config = {
        appKey: null
      };

      this._setConfig({ appKey });
      this.registerActor();
      return this;
    } catch (e) {
      console.log('## ERROR CONSTRUCTOR: ', e);
    }
  }

  async registerActor() {
    const actorId = await Actor.register();
    this._setActor({ actorId });
    return Promise.resolve(this.actor);
  }

  async identifyActor(props) {
    if (typeof props !== 'object') {
      throw new Error('Expected an object as user identity');
    }

    const actorId = await Actor.identify(props);

    this._setActor({
      actorId,
      ...props
    });

    return Promise.resolve(this.config.user);
  }

  async registerEvent(name, props) {
    if (typeof name !== 'string') {
      throw new Error('Event name should be a string');
    }

    if (typeof props !== 'object') {
      throw new Error('Event props should be an object');
    }

    const result = await Events.register(name, props);
    return Promise.resolve(result);
  }

  getActor(props) {
    return this.actor;
  }

  _setActor(props) {
    this.actor = props;

    ENV.Composite.actor = props;
  }

  _setConfig(props) {
    this.config = props;

    ENV.Composite.config = props;
  }

  /**
   * Creates a singleton instance of Composite
   * @param {object} config Configuration object
   * @example
   * Composite.init(
   *   {
   *	   appToken: '1231321321312312'
   *   }
   * );
   */
  static initialize(config = {}) {
    const instance = new Composite(config);

    ENV.Composite = instance;
    ENV.Composite.registerEvent = instance.registerEvent;
    ENV.Composite.identifyActor = instance.identifyActor;

    return instance;
  }
}

// Expose Composite.init to the global scope
ENV.Composite = {
  initialize: Composite.initialize
};
export default Composite;
