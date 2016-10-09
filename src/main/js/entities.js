import rest from 'rest';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' });

let subscribers = [];

function refreshFromServer() {
  client({path: '/references'}).then(function(response) {
    subscribers.forEach(function(notify) {
      notify(response.entity);
    });
  });
}

function references(subscribe) {
  if (subscribe) {
    subscribers.push(subscribe);
    refreshFromServer();
  }

  return {
    add: function(reference) {
      client({
        path: '/references',
        entity: reference
      }).then(refreshFromServer);
    },
    delete: function(reference) {
      const path = '/references/' + reference.id;
      client({path: path, entity: reference, method: 'DELETE'}).then(refreshFromServer);
    }
  }
}

export default references;

