'use strict';

const format = require('../../../lib/formatter/estadao'),
      assert = require('unit.js');

const concursos = [
    {
        input   : 'Concurso 012345678',
        expected: 12345678,
    },
];

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

const valores = [
    {
        input   : '700.000,00',
        expected: '700000.00',
    },
    {
        input   : '1.700.000,00',
        expected: '1700000.00',
    },
];

const datas = [
    {
        input   : '01/02/2018',
        expected: '2018-02-01',
    },
];

describe('Formatter: estadao', () =>
{
    concursos.forEach(concurso =>
    {
        it(`concurso: ${concurso.input} => ${concurso.expected}`, done =>
        {
            assert.number(format.concurso(concurso.input)).isEqualTo(concurso.expected);
            done();
        });
    });

    numeros.forEach(numero =>
    {
        it(`numero: ${numero.input} => ${numero.expected}`, done =>
        {
            assert.string(format.numero(numero.input)).isEqualTo(numero.expected);
            done();
        });
    });

    valores.forEach(valor =>
    {
        it(`valor: ${valor.input} => ${valor.expected}`, done =>
        {
            assert.string(format.valor(valor.input)).isEqualTo(valor.expected);
            done();
        });
    });

    datas.forEach(data =>
    {
        it(`data: ${data.input} => ${data.expected}`, done =>
        {
            assert.string(format.data(data.input)).isEqualTo(data.expected);
            done();
        });
    });
});
