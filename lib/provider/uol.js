'use strict';

const unirest = require('unirest'),
      cheerio = require('cheerio'),
      format  = require('../formatter/g1');

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

            var $ = cheerio.load(response.body, {
                ignoreWhitespace: true
            });

            var json = {
                origem  : 'uol',
                concurso: '',
                data    : '',
                premios : [
                    {premio: 1},
                    {premio: 2},
                    {premio: 3},
                    {premio: 4},
                    {premio: 5},
                ]
            };

            // Concurso
            $('.jogo th h3').each(function(item, element) {
                if (element.lastChild.type == 'text' && item < 1) {
                    json.concurso = Number(element.lastChild.data.trim().replace('Concurso ', ''));
                }
            });
            // Concurso

            // Data
            var d = new Date(Date.now());
            $('.jogo th').each(function(item, element) {
                if (element.lastChild.type == 'text' && item < 1) {
                    json.data = d.getFullYear() + '-' + element.lastChild.data.trim().substr(3, 2) + '-' + element.lastChild.data.trim().substr(0, 2);
                }
            });
            // Data

            // Números sorteados
            $('.jogo td').each(function(item, element) {
                if (element.lastChild.type == 'text' && item < 5) {
                    json.premios[item].numero = element.lastChild.data.trim().replace('.', '');
                }
            });
            // Números sorteados

            // Prêmios
            $('.premio td').each(function(item, element) {
                if (element.lastChild.type == 'text' && item < 10 && item % 2 != 0) {
                    json.premios[Math.floor(item / 2)].valor = element.lastChild.data.trim().replace('R$ ', '').replace('.', '').replace(',', '.');
                }
            });
            // Prêmios

            resolve(json);
        });
    });
};
