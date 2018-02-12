'use strict';

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'http://loterias.estadao.com.br/federal';

/**
 * Cabeçalhos da consulta.
 *
 * @var {Object}
 */
exports.headers = {
    'Cache-Control': 'no-cache',
    'cookie'       : 'security=true',
};
