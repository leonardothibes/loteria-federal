'use strict';

const unirest   = require('unirest'),
      validator = require('./validator');

/**
 * Faz a consulta HTTP.
 *
 * @param {Object} provider  Instância do provider.
 * @param {Object} formatter Instância do formatter do provider.
 *
 * @return {Promise}
 */
exports.fetch = function(provider, formatter)
{
    return new Promise((resolve, reject) =>
    {
        unirest.get(provider.url)
               .headers(provider.headers)
               .end(response =>
                {
                    if (response.error) {
                        reject(response.error);
                        return;
                    }

                    const formatted  = formatter.body(response.body);
                    const validation = validator.validate(formatted);

                    if (validation.valid) {
                        resolve(formatted);
                    } else {
                        reject(validation.errors);
                    }
                });
    });
};
