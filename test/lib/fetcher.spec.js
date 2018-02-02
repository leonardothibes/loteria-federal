'use strict';

const fetcher = require('../../lib/fetcher'),
      assert  = require('unit.js');

const providers = ['caixa', 'uol', 'g1'];
let provider, formatter;

describe('Fetcher', () =>
{
    providers.forEach(providerName =>
    {
        it(`Sucesso: ${providerName}`, done =>
        {
            provider  = require(`../../lib/provider/${providerName}`);
            formatter = require(`../../lib/formatter/${providerName}`);

            let promise = fetcher.fetch(provider, formatter);
            promise.then(response =>
            {
                validate(response, providerName);
                done();
            });
        });
    });

    it('Falha', done =>
    {
        let formatter, provider = {
            url    : 'http://localhost',
            headers: {
                'Cache-Control': 'no-cache',
                'cookie'       : 'security=true',
            }
        };

        let promise = fetcher.fetch(provider, formatter);

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


function validate(response, provider)
{
    assert.object(response)
        .hasProperty('origem')
        .hasProperty('concurso')
        .hasProperty('data')
        .hasProperty('premios');

    assert.string(response.origem).isEqualTo(provider);
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
}
