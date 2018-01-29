'use strict';

const provider = require('../../../lib/provider/caixa'),
      assert   = require('unit.js');

describe('Provider: caixa', () =>
{
    it('Sucesso', done =>
    {
        let promise = provider.fetch();
        promise.then(response =>
        {
            assert.object(response)
                .hasProperty('origem')
                .hasProperty('concurso')
                .hasProperty('data')
                .hasProperty('premios');

            assert.string(response.origem).isEqualTo('caixa');
            assert.number(response.concurso);
            assert.bool(RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(response.data)).isTrue();

            assert.object(response.premios).hasLength(5);
            response.premios.map((sorteio, i) =>
            {
                assert.object(sorteio)
                    .hasLength(3)
                    .hasProperty('premio')
                    .hasProperty('numero')
                    .hasProperty('valor');

                assert.number(sorteio.premio).isEqualTo(i+1);
                assert.bool(RegExp(/^[0-9]{5}$/).test(sorteio.numero)).isTrue();
                assert.bool(RegExp(/^[0-9]{1,7}\.[0-9]{2}$/).test(sorteio.valor)).isTrue();
            });

            done();
        });
    });

    it('Falha', done =>
    {
        provider.url = 'http://localhost';
        let promise  = provider.fetch();

        promise.catch(error =>
        {
            assert.object(error)
                .hasProperty('status')
                .hasProperty('message');

            assert.number(error.status);
            assert.string(error.message);

            done();
        });
    });
});
