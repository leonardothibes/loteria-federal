'use strict';

/**
 * URL do webservice.
 *
 * @var {String}
 */
exports.url = 'https://g1.globo.com/loterias/federal.ghtml';

/**
 * Cabeçalhos da consulta.
 *
 * @var {Object}
 */
exports.headers = {
    'Cache-Control': 'no-cache',
    'cookie'       : 'security=true',
};
