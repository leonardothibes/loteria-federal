'use strict';

/**
 * Retorna a lista de providers suportados.
 *
 * @return {Array}
 */
exports.providers = function()
{
    return ['caixa', 'g1'];
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
        console.log('Provider não suportado: ' + provider);
        throw new Error(e);
    }
};
