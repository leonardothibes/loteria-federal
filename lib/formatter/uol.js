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

    // Concurso e Data
    $('.lottery-info span').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 1) {
            json.concurso = exports.concurso(element.lastChild.data);
            json.data = exports.data(element.lastChild.data);
        }
    });
    // Concurso e Data

    // Números sorteados
    $('.lottery-results-table tbody tr td:nth-child(2)').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 5) {
            json.premios[item].numero = exports.numero(element.lastChild.data);
        }
    });
    // Números sorteados

    // Valores dos prêmios
    $('.lottery-results-table tbody tr td:nth-child(3)').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 5) {
            json.premios[item].valor = exports.valor(element.lastChild.data);
        }
    });
    // Valores dos prêmios

    return json;
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
    const lotteryInfoRegex = /concurso\s([0-9]*)\s\|\s\w*\s([0-9|.]*)/;
    const match = value.match(lotteryInfoRegex);
    return Number(match[1]);
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.numero = function(value)
{
    return String(value).substr(value.length - 5).replace(/\./g, '').trim();
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.valor = function(value)
{
    return String(value).trim().replace(/\./g, '').replace(/,/g, '.');
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.data = function(value)
{
    const lotteryInfoRegex = /concurso\s([0-9]*)\s\|\s\w*\s([0-9|.]*)/;
    const match = value.match(lotteryInfoRegex);
    const matchedValue = match[2];

    var date = new Date(Date.now());

    return date.getFullYear() + '-' + matchedValue.trim().substr(3, 2) + '-' + matchedValue.trim().substr(0, 2);
};
