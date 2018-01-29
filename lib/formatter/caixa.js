'use strict';

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
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
    return String(value).replace('.', '').replace(',', '.');
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
