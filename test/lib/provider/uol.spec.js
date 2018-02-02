'use strict';

const provider = require('../../../lib/provider/uol'),
      assert   = require('unit.js');

describe('Provider: uol', () =>
{
    it('URL', done =>
    {
        const regex = RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/);
        assert.bool(regex.test(provider.url)).isTrue();
        done();
    });

    it('Headers', done =>
    {
        assert.object(provider.headers)
            .hasProperty('Cache-Control')
            .hasProperty('cookie');

        assert.string(provider.headers['Cache-Control']).isEqualTo('no-cache');
        assert.string(provider.headers.cookie).isEqualTo('security=true');

        done();
    });
});
