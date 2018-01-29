'use strict';

const format = require('../../../lib/formatter/caixa'),
      assert = require('unit.js');

const numeros = [
    {
        input   : '012345678',
        expected: '012345678',
    },
    {
        input   : '01.23.456.78',
        expected: '012345678',
    },
];

describe('Formatter: caixa', () =>
{
    numeros.forEach(numero =>
    {
        it(`concurso: ${numero.input} => ${numero.expected}`, done =>
        {
            assert.string(format.numero(numero.input)).isEqualTo(numero.expected);
            done();
        });
    });
});
