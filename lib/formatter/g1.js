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
    return String(value.join('')).trim();
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
    return String(value).replace(/T00:00:00/g, '');
};
