'use strict';

const unirest = require('unirest'),
      format  = require('../formatter/caixa');

/**
 * Consulta o resultado no site da Caixa Econômica Federal.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {
        var req = unirest('GET', 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp');

        req.headers({
            'Cache-Control': 'no-cache',
            'cookie'       : 'security=true',
        });

        req.end(response =>
        {
            if (response.error) {
                reject(response.error);
                return;
            }

            let body = response.body.split('|');
            resolve({
                origem  : 'caixa',
                concurso: format.concurso(body[2]),
                data    : format.data(body[16]),
                premios : [
                    {
                        premio: 1,
                        numero: format.numero(body[6]),
                        valor : format.valor(body[7]),
                    },
                    {
                        premio: 2,
                        numero: format.numero(body[8]),
                        valor : format.valor(body[9]),
                    },
                    {
                        premio: 3,
                        numero: format.numero(body[10]),
                        valor : format.valor(body[11]),
                    },
                    {
                        premio: 4,
                        numero: format.numero(body[12]),
                        valor : format.valor(body[13]),
                    },
                    {
                        premio: 5,
                        numero: format.numero(body[14]),
                        valor : format.valor(body[15]),
                    },
                ]
            });
        });
    });
};
