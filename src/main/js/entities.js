import rest from 'rest';
import mime from 'rest/interceptor/mime';
import defaultRequest from 'rest/interceptor/defaultRequest';


let client = rest.wrap(mime, { mime: 'application/json' });
let referencesSubscribers = [];
let userSubs = [];
const referencesPath = '/api/references';

function refreshReferences() {
  client({path: referencesPath}).then(function(response) {
    referencesSubscribers.forEach(function(notify) {
      notify(response.entity);
    });
  });
}

function references(subscribe) {
  if (subscribe) {
    referencesSubscribers.push(subscribe);
    refreshReferences();
  }

  return {
    add: function(reference) {
      client({
        path: referencesPath,
        entity: reference
      }).then(refreshReferences);
    },
    delete: function(reference) {
      const path = referencesPath + '/' + reference.id;
      client({path: path, entity: reference, method: 'DELETE'}).then(refreshReferences);
    }
  }
}

function userForm(path, user) {
  return client({path, entity: user, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

function addAuthorizationHeaderToFollowingRequests(header) {
  client = client.wrap(defaultRequest, {headers: {'Authorization': header}});
}
function removeAuthorizationHeaderToFollowingRequests() {
  client = client.wrap(defaultRequest, {headers: {}});
}

function user(callback) {
  if (callback) {
    userSubs.push(callback);
  }
  return {
    add: function(user) {
      userForm('/auth/register', user).then(function(response) {
        addAuthorizationHeaderToFollowingRequests(response.headers.Authorization);
        refreshReferences();
      });
    },
    login: function(user) {
      userForm('/auth', user).then(function(response) {
        addAuthorizationHeaderToFollowingRequests(response.headers.Authorization);
        client('/api/user').then(function(response) {
          userSubs.forEach(function(callback) {
            callback(response.entity);
          });
        });
      });
    },
    logout: function() {
      client({path:'/auth/logout', entity: {}}).then(function() {
        removeAuthorizationHeaderToFollowingRequests();
        userSubs.forEach(function(callback) {
          callback();
        });

      });
    }
  }
}

export {references, user};
