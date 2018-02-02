'use strict';

const fetcher   = require('./lib/fetcher'),
      validator = require('./lib/validator'),
      path      = require('path'),
      list      = require('list-dir');

/**
 * Retorna a lista de providers suportados.
 *
 * @return {Array}
 */
exports.providers = function()
{
    return list.sync('./lib/provider').map(file => path.basename(file).replace('.js', ''));
};

/**
 * Consulta o resultado.
 *
 * @param {String} providerName
 *
 * @return {Promise}
 */
exports.fetch = function(providerName)
{
    providerName = providerName || 'caixa';

    try {
        const provider  = require(`./lib/provider/${providerName}`);
        const formatter = require(`./lib/formatter/${providerName}`);

        return fetcher.fetch(provider, formatter);
    } catch (e) {
        throw new Error(`Provider não suportado: ${providerName}`);
    }
};

/**
 * Validação resumida do formato da consulta.
 *
 * @param {Object} body
 *
 * @return {Bool}
 */
exports.isValid = validator.isValid;

/**
 * Validação detalhada do formato da consulta.
 *
 * @param {Object} body
 *
 * @return {Object}
 */
exports.validate = validator.validate;
