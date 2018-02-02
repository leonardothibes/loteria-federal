'use strict';

const validator = require('../../lib/validator'),
      assert    = require('unit.js');

describe('Validator', () =>
{
    it('Validação resumida com Sucesso', done =>
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

        let validation = validator.isValid(body);
        assert.bool(validation).isTrue();

        done();
    });

    it('Validação detalhada com Sucesso', done =>
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

        let validation = validator.validate(body);
        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isTrue();
        assert.array(validation.errors).hasLength(0);

        done();
    });

    it('Falha 1', done =>
    {
        let body       = null;
        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(5);

        done();
    });

    it('Falha 2', done =>
    {
        let body       = {};
        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(4);

        done();
    });

    it('Falha 3', done =>
    {
        let body = {
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

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 2)
            .hasProperty('message', 'Origem não está presente');

        done();
    });

    it('Falha 4', done =>
    {
        let body = {
            origem  : 'caixa',
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

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 3)
            .hasProperty('message', 'Número do concurso não está presente');

        done();
    });

    it('Falha 5', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 'a',
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

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 4)
            .hasProperty('message', 'Número do concurso com formato inválido');

        done();
    });

    it('Falha 6', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 5)
            .hasProperty('message', 'Data do concurso não está presente');

        done();
    });

    it('Falha 7', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018/01/31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 6)
            .hasProperty('message', 'Data do concurso com formato inválido');

        done();
    });

    it('Falha 8', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 7)
            .hasProperty('message', 'Número de sorteios incorreto');

        done();
    });

    it('Falha 9', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 8)
            .hasProperty('message', 'O campo \"prêmio\" não está presente no 1o sorteio');

        done();
    });

    it('Falha 10', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 'a', numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 9)
            .hasProperty('message', 'Campo \"prêmio\" com formato inválido no 2o sorteio');

        done();
    });

    it('Falha 11', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numer: '18091', valor: '15000.00'  },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 10)
            .hasProperty('message', 'O campo \"numero\" não está presente no 3o sorteio');

        done();
    });

    it('Falha 12', done =>
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
                { premio: 4, numero: '1402', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 11)
            .hasProperty('message', 'O número sorteado está com formato inválido no 4o sorteio');

        done();
    });

    it('Falha 13', done =>
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
                { premio: 5, numero: '51099', valo: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 12)
            .hasProperty('message', 'O campo \"valor\" não está presente no 5o sorteio');

        done();
    });

    it('Falha 14', done =>
    {
        let body = {
            origem  : 'caixa',
            concurso: 5254,
            data    : '2018-01-31',
            premios :
            [
                { premio: 1, numero: '39332', valor: '350000.00' },
                { premio: 2, numero: '01637', valor: '18000.00'  },
                { premio: 3, numero: '18091', valor: 'a'         },
                { premio: 4, numero: '14028', valor: '12000.00'  },
                { premio: 5, numero: '51099', valor: '10023.00'  },
            ]
        };

        let validation = validator.validate(body);

        assert.object(validation)
            .hasProperty('valid')
            .hasProperty('errors');

        assert.bool(validation.valid).isFalse();
        assert.array(validation.errors).hasLength(1);

        assert.object(validation.errors[0])
            .hasProperty('status', 13)
            .hasProperty('message', 'O valor do prêmio está com formato inválido no 3o sorteio');

        done();
    });
});
