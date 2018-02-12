'use strict';

const index  = require('../index'),
      assert = require('unit.js');

describe('Entry-Point', () =>
{
    it('Lista de providers', done =>
    {
        assert.array(index.providers()).is(['caixa', 'estadao', 'g1', 'uol']);
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

    it('Validação resumida', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = index.isValid(body);
        assert.bool(validation).isTrue();

        done();
    });

    it('Validação detalhada', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = index.validate(body);
        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isTrue();
        assert.array(validation.errors).hasLength(0);

        done();
    });
});
