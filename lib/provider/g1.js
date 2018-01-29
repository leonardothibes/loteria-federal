'use strict';

const unirest = require('unirest'),
      format  = require('../formatter/g1');

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'https://g1.globo.com/loterias/federal.ghtml';

/**
 * Consulta o resultado no site do G1.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {
        var req = unirest('GET', exports.url);

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

            let saida = response.body.match(/var concursos =(.*);/g);

            saida = saida[0].replace(/var concursos = /g, '').replace(/;/g, '');
            saida = JSON.parse(saida);
            saida = saida[saida.length - 1];

            var json = {
                origem  : 'g1',
                concurso: format.concurso(saida.numero),
                data    : format.data(saida.data),
                premios : []
            };

            for (var i = 0; i < 5; i++) {
                json.premios[i] = {
                    premio: i + 1,
                    numero: format.numero(saida.premiacoes[i].numero_bilhete),
                    valor : format.valor(saida.premiacoes[i].valor_premio),
                };
            }

            resolve(json);
        });
    });
};
