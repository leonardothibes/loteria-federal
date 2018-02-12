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
        const handler = response =>
        {
            if (response.error) {
                reject(response.error);
                return;
            }

            let body = response.body;

            const responsed  = formatter.body(response.body);
            const validation = validator.validate(responsed);

            if (validation.valid) {
                resolve(responsed);
            } else {
                reject(validation.errors);
            }
        };

        unirest.get(provider.url).headers(provider.headers).end(handler);
    });
};
