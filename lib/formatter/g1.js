'use strict';

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
    value = String(value).replace(/\./g, '');

    return Number(value);
};

/**
 * @param {Array} value
 *
 * @return {String}
 */
exports.numero = function(value)
{
    return String(value.join('')).trim();
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
    return String(value).replace(/T00:00:00/g, '');
};
