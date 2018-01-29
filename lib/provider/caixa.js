'use strict';

const unirest = require('unirest'),
      url     = 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp';

/**
 * Consulta o resultado no site da Caixa Econômica Federal.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {

        var req = unirest('GET', url);

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
                concurso: body[2],
                data    : body[16],
                premios : [
                    {
                        premio: 1,
                        numero: body[6],
                        valor : body[7],
                    },
                    {
                        premio: 2,
                        numero: body[8],
                        valor : body[9],
                    },
                    {
                        premio: 3,
                        numero: body[10],
                        valor : body[11],
                    },
                    {
                        premio: 4,
                        numero: body[12],
                        valor : body[13],
                    },
                    {
                        premio: 5,
                        numero: body[14],
                        valor : body[15],
                    },
                ]
            });
        });
    });
};
