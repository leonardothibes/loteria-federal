'use strict';

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp';

/**
 * Cabeçalhos da consulta.
 *
 * @var {Object}
 */
exports.headers = {
    'Cache-Control': 'no-cache',
    'cookie'       : 'security=true',
};
