/**
 * Refreshes a OpenID token.
 */

const Issuer = require('openid-client').Issuer;

'use strict';

module.exports = {
  refresh: function (config) {
    return new Promise((resolv, reject) => {
      Issuer.discover(config['idp-issuer-url']) // => Promise
        .then(function (ourIssuer) {
          const client = new ourIssuer.Client({
            client_id: config['client-id'],
            client_secret: config['client-secret']
          });

          return client.refresh(config['refresh-token']);
        })
        .then(tokenSet => {
          return resolv(tokenSet.id_token);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};