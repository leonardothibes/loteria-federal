'use strict';

const index  = require('../index'),
      assert = require('unit.js');

describe('Entry-Point', () =>
{
    it('Lista de providers', done =>
    {
        assert.array(index.providers()).is(['caixa', 'g1', 'uol']);
        done();
    });

    it('Tratamento de erro', done =>
    {
        try {
            index.fetch('PROVIDER');
        } catch (e) {
            assert.string(e.message).isEqualTo('Provider não suportado: PROVIDER');
            done();
        }
    });

    it('Obtendo resultado fornecendo provider: g1', done =>
    {
        index.fetch('g1').then(response =>
        {
            assert.object(response)
                .hasProperty('origem')
                .hasProperty('concurso')
                .hasProperty('data')
                .hasProperty('premios');

            assert.string(response.origem).isEqualTo('g1');
            assert.object(response.premios).hasLength(5);

            done();
        });
    });

    it('Obtendo resultado fornecendo provider: caixa', done =>
    {
        index.fetch('caixa').then(response =>
        {
            assert.object(response)
                .hasProperty('origem')
                .hasProperty('concurso')
                .hasProperty('data')
                .hasProperty('premios');

            assert.string(response.origem).isEqualTo('caixa');
            assert.object(response.premios).hasLength(5);

            done();
        });
    });

    it('Obtendo resultado com provider default: caixa', done =>
    {
        index.fetch().then(response =>
        {
            assert.object(response)
                .hasProperty('origem')
                .hasProperty('concurso')
                .hasProperty('data')
                .hasProperty('premios');

            assert.string(response.origem).isEqualTo('caixa');
            assert.object(response.premios).hasLength(5);

            done();
        });
    });
});
