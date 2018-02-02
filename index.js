'use strict';

const path = require('path'),
      list = require('list-dir');

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
 * @param {String} provider
 *
 * @return {Promise}
 */
exports.fetch = function(provider)
{
    provider = provider || 'caixa';

    try {
        return require('./lib/provider/' + provider).fetch();
    } catch (e) {
        throw new Error('Provider não suportado: ' + provider);
    }
};
