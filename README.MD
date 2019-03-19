# Composite Javascript client

Javascript-based library that stablishes the communication between the client and the Composite API based on the given set of events and actors.

### init(config)

Initializes the Composite library in the application.

#### Arguments

- `config` (Object):

  - `appKey` (String): Authentication key

```js
Composite.init({ appKey: 'YOUR_APP_KEY_HERE' });
```

### registerActor()

Whenever the client is initialized, we check the existence of `actor_id` in the localStorage. If it doesn't exists, send a request to the API and store the received actor_id. Otherwise, don't do anything.

```js
Composite.registerActor();
```

### identifyActor(props)

The method `identifyActor` returns a new `actor_id`, which can be a brand new one or an existing one, to replace the existing one in the localStorage.

```js
Composite.identifyActor({
  $id: string,
  $email: string,
  $reservedProps: whatever,
  customProps: whatever
});
```

### registerEvent(name, props)

Register an event with the given name and properties

```js
Composite.registerEvent('purchase', {
  value: 1311,
  currency: 'EUR'
});
```
