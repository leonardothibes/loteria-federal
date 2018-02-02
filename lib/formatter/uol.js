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

    // Concurso
    $('.jogo th h3').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 1) {
            json.concurso = exports.concurso(element.lastChild.data);
        }
    });
    // Concurso

    // Data
    var d = new Date(Date.now());
    $('.jogo th').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 1) {
            json.data = exports.data(element.lastChild.data);
        }
    });
    // Data

    // Números sorteados
    $('.jogo td').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 5) {
            json.premios[item].numero = exports.numero(element.lastChild.data);
        }
    });
    // Números sorteados

    // Valores dos prêmios
    $('.premio td').each(function(item, element) {
        if (element.lastChild.type == 'text' && item < 10 && item % 2 != 0) {
            json.premios[Math.floor(item / 2)].valor = exports.valor(element.lastChild.data);
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
    value = exports.numero(value);

    return Number(value.trim().replace('Concurso ', ''));
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
    return String(value).trim().replace('R$ ', '').replace(/\./g, '').replace(/,/g, '.');
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.data = function(value)
{
    var date = new Date(Date.now());

    return date.getFullYear() + '-' + value.trim().substr(3, 2) + '-' + value.trim().substr(0, 2);
};
