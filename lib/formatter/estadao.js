'use strict';

const cheerio = require('cheerio');

/**
 * Converte o retorno em um objeto padronizado.
 *
 * @param {String} body
 *
 * @return {Object}
 */
exports.body = function(body)
{
    var $ = cheerio.load(body, {
        ignoreWhitespace: true
    });

    var json = {
        origem  : 'estadao',
        concurso: exports.concurso($('.loterias__subtitle').html()),
        data    : exports.data($('.loterias__information__item span').html()),
        premios : [],
    };

    for (var i = 0; i < 5; i++) {
        json.premios[i] = {
            premio: i + 1,
            numero: '',
            valor : ''
        };
    }

    // Números sorteados
    $('.loterais__table tbody').children('tr').children('td').each((item, element) =>
    {
        if (item % 3 == 1) {
            json.premios[Math.floor(item / 3)].numero = exports.numero(element.firstChild.data);
        }

        if (item % 3 == 2) {
            json.premios[Math.floor(item / 3)].valor = exports.valor(element.lastChild.data);
        }
    });
    // Números sorteados

    return json;
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
    return Number(String(value).trim().replace('Concurso ', ''));
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.numero = function(value)
{
    return String(value).replace(/\./g, '').trim();
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.valor = function(value)
{
    return String(value).replace('R$', '').replace(/\./g, '').replace(/,/g, '.').trim();
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.data = function(value)
{
    return value.trim().substr(6, 4) + '-' + value.trim().substr(3, 2) + '-' + value.trim().substr(0, 2);
};
