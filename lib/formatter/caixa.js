'use strict';

/**
 * Converte o retorno em um objeto padronizado.
 *
 * @param {String} body
 *
 * @return {Object}
 */
exports.body = function(body)
{
    body = String(body).split('|');

    return {
        origem  : 'caixa',
        concurso: exports.concurso(body[2]),
        data    : exports.data(body[16]),
        premios : [
            {
                premio: 1,
                numero: exports.numero(body[6]),
                valor : exports.valor(body[7]),
            },
            {
                premio: 2,
                numero: exports.numero(body[8]),
                valor : exports.valor(body[9]),
            },
            {
                premio: 3,
                numero: exports.numero(body[10]),
                valor : exports.valor(body[11]),
            },
            {
                premio: 4,
                numero: exports.numero(body[12]),
                valor : exports.valor(body[13]),
            },
            {
                premio: 5,
                numero: exports.numero(body[14]),
                valor : exports.valor(body[15]),
            },
        ]
    };
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
    value = exports.numero(value);

    return Number(value);
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.numero = function(value)
{
    return String(value).replace(/\./g, '');
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.valor = function(value)
{
    return String(value).replace(/\./g, '').replace(/,/g, '.');
};

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.data = function(value)
{
    let data = String(value).trim().split('/');

    return `${data[2]}-${data[1]}-${data[0]}`;
};
