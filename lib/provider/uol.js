'use strict';

const unirest = require('unirest'),
      format  = require('../formatter/uol');

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'https://noticias.uol.com.br/loterias/loteria-federal';

/**
 * Consulta o resultado no site do UOL.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {
        var request = unirest.get(exports.url);

        request.headers({
            'Cache-Control': 'no-cache',
            'cookie'       : 'security=true',
        });

        request.end(response =>
        {
            if (response.error) {
                reject(response.error);
                return;
            }

            const formatted = format.body(response.body);
            resolve(formatted);
        });
    });
};
