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
    let saida = body.match(/var concursos =(.*);/g);
    if (!saida) {
        return null;
    }

    saida = saida[0].replace(/var concursos = /g, '').replace(/;/g, '');
    saida = JSON.parse(saida);
    saida = saida[saida.length - 1];

    var json = {
        origem  : 'g1',
        concurso: exports.concurso(saida.numero),
        data    : exports.data(saida.data),
        premios : []
    };

    for (var i = 0; i < 5; i++) {
        json.premios[i] = {
            premio: i + 1,
            numero: exports.numero(saida.premiacoes[i].numero_bilhete),
            valor : exports.valor(saida.premiacoes[i].valor_premio),
        };
    }

    return json;
};

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
