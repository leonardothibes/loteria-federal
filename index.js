'use strict';

/**
 * Retorna a lista de providers suportados.
 *
 * @return {Array}
 */
exports.providers = function()
{
    return ['caixa', 'g1', 'uol'];
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
