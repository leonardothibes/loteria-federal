'use strict';

const unirest = require('unirest');

/**
 * Consulta o resultado no site da Caixa Econômica Federal.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {
        var req = unirest('GET', 'https://g1.globo.com/loterias/federal.ghtml');

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
                concurso: saida.numero,
                data    : saida.data.replace(/T00:00:00/g, ''),
                premios: []
            };

            for (var i = 1; i <= 5; i++) {
                json.premios[i - 1] = {
                    premio: i,
                    numero: saida.premiacoes[i - 1].numero_bilhete.join(''),
                    valor: saida.premiacoes[i - 1].valor_premio.replace('.', '').replace(',', '.')
                };
            }

            resolve(json);

        });
    });
};
