'use strict';

const unirest = require('unirest'),
      format  = require('../formatter/caixa');

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp';

/**
 * Consulta o resultado no site da Caixa Econômica Federal.
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
