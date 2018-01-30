'use strict';

/**
 * @param {String} value
 *
 * @return {String}
 */
exports.concurso = function(value)
{
    value = String(value);

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
    var d = new Date(Date.now());

    return d.getFullYear() + '-' + value.trim().substr(3, 2) + '-' + value.trim().substr(0, 2);
};
