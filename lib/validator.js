'use strict';

/**
 * Validação resumida do formato da consulta.
 *
 * @param {Object} body
 *
 * @return {Bool}
 */
exports.isValid = function(body)
{
    return exports.validate(body).valid;
};

/**
 * Validação detalhada do formato da consulta.
 *
 * @param {Object} body
 *
 * @return {Object}
 */
exports.validate = function(body)
{
    let response = {
        valid : true,
        errors: []
    };

    if (isNullOrEmpty(body)) {
        response.valid = false;
        response.errors.push({
            status : 1,
            message: 'Tipo de retorno inválido',
        });
        body = {premios: []};
    }

    if (!body.origem) {
        response.valid = false;
        response.errors.push({
            status : 2,
            message: 'Origem não está presente',
        });
    }

    if (!body.concurso) {
        response.valid = false;
        response.errors.push({
            status : 3,
            message: 'Número do concurso não está presente',
        });
    }

    if (body.concurso && !RegExp(/^[0-9]{4,5}$/).test(body.concurso)) {
        response.valid = false;
        response.errors.push({
            status : 4,
            message: 'Número do concurso com formato inválido',
        });
    }

    if (!body.data) {
        response.valid = false;
        response.errors.push({
            status : 5,
            message: 'Data do concurso não está presente',
        });
    }

    if (body.data && !RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(body.data)) {
        response.valid = false;
        response.errors.push({
            status : 6,
            message: 'Data do concurso com formato inválido',
        });
    }

    if (!body.premios || isNullOrEmpty(body.premios)) {
        response.valid = false;
        response.errors.push({
            status : 7,
            message: 'Número de sorteios incorreto',
        });
    }

    let sorteio;
    for (let i in body.premios) {
        sorteio = body.premios[i];

        if (!sorteio.premio) {
            response.valid = false;
            response.errors.push({
                status : 8,
                message: `O campo "prêmio" não está presente no ${(parseInt(i) + 1)}o sorteio`,
            });
        }

        if (sorteio.premio && !RegExp(/^[0-9]{1}$/).test(sorteio.premio)) {
            response.valid = false;
            response.errors.push({
                status : 9,
                message: `Campo "prêmio" com formato inválido no ${(parseInt(i) + 1)}o sorteio`,
            });
        }

        if (!sorteio.numero) {
            response.valid = false;
            response.errors.push({
                status : 10,
                message: `O campo "numero" não está presente no ${(parseInt(i) + 1)}o sorteio`,
            });
        }

        if (sorteio.numero && !RegExp(/^[0-9]{5}$/).test(sorteio.numero)) {
            response.valid = false;
            response.errors.push({
                status : 11,
                message: `O número sorteado está com formato inválido no ${(parseInt(i) + 1)}o sorteio`,
            });
        }

        if (!sorteio.valor) {
            response.valid = false;
            response.errors.push({
                status : 12,
                message: `O campo "valor" não está presente no ${(parseInt(i) + 1)}o sorteio`,
            });
        }

        if (sorteio.valor && !RegExp(/^[0-9]{1,7}\.[0-9]{2}$/).test(sorteio.valor)) {
            response.valid = false;
            response.errors.push({
                status : 13,
                message: `O valor do prêmio está com formato inválido no ${(parseInt(i) + 1)}o sorteio`,
            });
        }
    }

    return response;
};

/**
 * @param {mixed} value
 *
 * @return {Bool}
 */
function isNullOrEmpty(value)
{
    return (!value || value === undefined || value === '' || value.length === 0);
}
