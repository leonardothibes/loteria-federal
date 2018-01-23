'use strict';

const exec = require('child_process').exec,
      url  = 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp',
      cmd  = '/usr/bin/wget ' + url + ' -O /tmp/buffer.txt ; cat /tmp/buffer.txt ; rm -f /tmp/buffer.txt';

/**
 * Consulta o resultado no site da Caixa Econômica Federal.
 *
 * @return {Promise}
 */
exports.fetch = function()
{
    return new Promise((resolve, reject) =>
    {
        exec(cmd, (error, stdout) =>
        {
            if (error) {
                reject(error);
                return;
            }

            let response = stdout.split('|');
            resolve(response);
        });
    });
};
