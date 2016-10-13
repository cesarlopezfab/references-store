import rest from 'rest';
import mime from 'rest/interceptor/mime';
import defaultRequest from 'rest/interceptor/defaultRequest';


let client = rest.wrap(mime, { mime: 'application/json' });
let subscribers = [];

const referencesPath = '/api/references';

function refreshFromServer() {
  client({path: referencesPath}).then(function(response) {
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
        path: referencesPath,
        entity: reference
      }).then(refreshFromServer);
    },
    delete: function(reference) {
      const path = referencesPath + '/' + reference.id;
      client({path: path, entity: reference, method: 'DELETE'}).then(refreshFromServer);
    }
  }
}

function user() {
  return {
    add: function(user) {
      client({path:'/auth/register', entity: user, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(response) {
        client = client.wrap(defaultRequest, {headers: {'Authorization': response.headers.Authorization}});
        refreshFromServer();
      });
    },
    login: function(user) {
      client({path:'/auth', entity: user, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(response) {
        client = client.wrap(defaultRequest, {headers: {'Authorization': response.headers.Authorization}});
        refreshFromServer();
      });
    },
    logout: function() {
      client({path:'/auth/logout', entity: {}}).then(function() {
        console.log('logged out!!');
      });
    }
  }
}

export {references, user};
