[![npm](http://img.shields.io/npm/v/loteria-federal.svg)](https://www.npmjs.com/package/loteria-federal) ![Downloads](https://img.shields.io/npm/dm/loteria-federal.svg) [![Build Status](https://secure.travis-ci.org/leonardothibes/loteria-federal.png)](http://travis-ci.org/leonardothibes/loteria-federal) [![Package Quality](http://npm.packagequality.com/shield/loteria-federal.svg)](http://packagequality.com/#?package=loteria-federal) [![License](https://img.shields.io/npm/l/loteria-federal.svg)](LICENSE)

Consulta o resultado da loteria federal.

Features
--------

* Sempre atualizado em tempo-real por se conectar diretamente a serviços como o da __Caixa__, e grandes portais como __Uol__ e __G1__.
* Sem limites de uso (rate limits) conhecidos
* Interface de Promise extremamente simples

Instalação
----------

```bash
npm install loteria-federal --save
```

Como utilizar
-------------

* [Consulta Caixa](#consulta-caixa)
* [Consulta Uol](#consulta-uol)
* [Consulta G1](#consulta-g1)
* [Lista Fontes](#lista-fontes)

Consulta Caixa
--------------

```js
const loteria = require('loteria-federal');

loteria.fetch('caixa') // default
    .then(console.log),
    .catch(console.log);

    // {
    //    "origem"  : "caixa",
    //    "concurso": "05251",
    //    "data"    : "2018-01-20",
    //    "premios" : [
    //        {
    //            "premio": "1",
    //            "numero": "58652",
    //            "valor" : "700000.00"
    //        },
    //        {
    //            "premio": "2",
    //            "numero": "70529",
    //            "valor" : "28000.00"
    //        },
    //        {
    //            "premio": "3",
    //            "numero": "72083",
    //            "valor" : "26000.00"
    //        },
    //        {
    //            "premio": "4",
    //            "numero": "78227",
    //            "valor" : "22000.00"
    //        },
    //        {
    //            "premio": "5",
    //            "numero": "32487",
    //            "valor" : "20040.00"
    //        }
    //    ]
    // }
```

Consulta Uol
------------

```js
const loteria = require('loteria-federal');

loteria.fetch('uol')
    .then(console.log),
    .catch(console.log);

    // {
    //    "origem"  : "uol",
    //    "concurso": "05251",
    //    "data"    : "2018-01-20",
    //    "premios" : [
    //        {
    //            "premio": "1",
    //            "numero": "58652",
    //            "valor" : "700000.00"
    //        },
    //        {
    //            "premio": "2",
    //            "numero": "70529",
    //            "valor" : "28000.00"
    //        },
    //        {
    //            "premio": "3",
    //            "numero": "72083",
    //            "valor" : "26000.00"
    //        },
    //        {
    //            "premio": "4",
    //            "numero": "78227",
    //            "valor" : "22000.00"
    //        },
    //        {
    //            "premio": "5",
    //            "numero": "32487",
    //            "valor" : "20040.00"
    //        }
    //    ]
    // }
```

Consulta G1
-----------

```js
const loteria = require('loteria-federal');

loteria.fetch('g1')
    .then(console.log),
    .catch(console.log);

    // {
    //    "origem"  : "g1",
    //    "concurso": "05251",
    //    "data"    : "2018-01-20",
    //    "premios" : [
    //        {
    //            "premio": "1",
    //            "numero": "58652",
    //            "valor" : "700000.00"
    //        },
    //        {
    //            "premio": "2",
    //            "numero": "70529",
    //            "valor" : "28000.00"
    //        },
    //        {
    //            "premio": "3",
    //            "numero": "72083",
    //            "valor" : "26000.00"
    //        },
    //        {
    //            "premio": "4",
    //            "numero": "78227",
    //            "valor" : "22000.00"
    //        },
    //        {
    //            "premio": "5",
    //            "numero": "32487",
    //            "valor" : "20040.00"
    //        }
    //    ]
    // }
```

Lista Fontes
------------

```js
const loteria = require('loteria-federal');

const providers = loteria.providers();

console.log(providers);

    // [
    //     'caixa',
    //     'g1',
    //     'uol'
    // ]
```

Testes e desenvolvimento
------------------------

* Instalar dependências externas: **``npm install``**
* Roda os testes sem relatório de coverage: **``npm test``**
* Roda os testes com relatório de coverage: **``npm run testdox``**
* Para mais opções: **``npm run help``**

Como contribuir
-----------------

* Abra uma issue no Github ou um Pull Request com o que você deseja alterar.
* Só aceitamos código cujos testes estejam passando.

Contributors
------------

 * **Leonardo Thibes <leonardothibes@gmail.com>**

LICENSE
=======

Copyright (c) 2017 Leonardo Thibes

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
