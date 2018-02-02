'use strict';

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'https://noticias.uol.com.br/loterias/loteria-federal';

/**
 * Cabeçalhos da consulta.
 *
 * @var {Object}
 */
exports.headers = {
    'Cache-Control': 'no-cache',
    'cookie'       : 'security=true',
};
