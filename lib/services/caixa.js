'use strict';

const exec = require('child_process').exec,
      wget = require('path').resolve(__dirname + '../../../bin/wget');

const url  = 'http://www1.caixa.gov.br/loterias/loterias/federal/federal_pesquisa.asp',
      cmd  = wget + ' ' + url + ' -O /tmp/buffer.txt ; cat /tmp/buffer.txt ; rm -f /tmp/buffer.txt';

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
            if (error || !stdout) {
                reject({
                    code   : 'ERROR',
                    message: 'Não foi possível fazer a consulta, tente novamente mais tarde',
                });
                return;
            }

            let response = stdout.split('|');
            resolve({
                concurso: response[2],
                data    : response[16],
                premios : [
                    {
                        premio: 1,
                        numero: response[6],
                        valor : response[7],
                    },
                    {
                        premio: 2,
                        numero: response[8],
                        valor : response[9],
                    },
                    {
                        premio: 3,
                        numero: response[10],
                        valor : response[11],
                    },
                    {
                        premio: 4,
                        numero: response[12],
                        valor : response[13],
                    },
                    {
                        premio: 5,
                        numero: response[14],
                        valor : response[15],
                    },
                ]
            });
        });
    });
};
