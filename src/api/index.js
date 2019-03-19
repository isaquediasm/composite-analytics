import config from '../config.js';

function settings(method, apiKey, body) {
  const _body = body ? { body: JSON.stringify(body) } : {};
  console.log('##BODY', _body);
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    ..._body
  };
}

function url(endpoint) {
  return `${config.api.url}${endpoint}`;
}

function fetcher(url, settings) {
  return new Promise((res, rej) => {
    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(res)
      .catch(rej);
  });
}

const api = {
  post(endpoint, body) {
    return fetcher(
      url(endpoint),
      settings('POST', window.Composite.config.appKey, body)
    );
  },

  put(endpoint, body) {
    return fetcher(
      url(endpoint),
      settings('PUT', window.Composite.config.appKey, body)
    );
  }
};

export default api;
