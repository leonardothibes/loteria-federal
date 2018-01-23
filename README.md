# Consulta Loteria Federal [![npm](http://img.shields.io/npm/v/loteria-federal.svg)](https://www.npmjs.com/package/loteria-federal) ![Downloads](https://img.shields.io/npm/dm/loteria-federal.svg) [![Build Status](https://secure.travis-ci.org/leonardothibes/loteria-federal.png)](http://travis-ci.org/leonardothibes/loteria-federal) [![Package Quality](http://npm.packagequality.com/shield/loteria-federal.svg)](http://packagequality.com/#?package=loteria-federal) [![License](https://img.shields.io/npm/l/loteria-federal.svg)](LICENSE)

Consulta o resultado do último concurso da loteria federal. A busca é integrada diretamente ao serviço da [Caixa Econômica Federal](http://www.caixa.gov.br).

Features
--------

* Sempre atualizado em tempo-real por se conectar diretamente ao serviço da Caixa
* Sempre retorna a resposta mais rápida e mais atualizada por não usar fontes intermerdiárias
* Sem limites de uso (rate limits) conhecidos
* Interface de Promise extremamente simples

Instalação
----------

```bash
npm install loteria-federal --save
```

Como utilizar
-------------

```js
const loteria = require('loteria-federal');

loteria.fetch()
    .then(console.log);

    // {
    //    "concurso": "05251",
    //    "data"    : "20/01/2018",
    //    "premios" : [
    //        {
    //            "premio": "1",
    //            "numero": "58652",
    //            "valor" : "700000.00"
    //        },
    //        {
    //            "premio": "2",
    //            "numero": "70.529",
    //            "valor" : "28000.00"
    //        },
    //        {
    //            "premio": "3",
    //            "numero": "72.083",
    //            "valor" : "26000.00"
    //        },
    //        {
    //            "premio": "4",
    //            "numero": "78.227",
    //            "valor" : "22000.00"
    //        },
    //        {
    //            "premio": "5",
    //            "numero": "32.487",
    //            "valor" : "20040.00"
    //        }
    //    ]
    // }
```

Testes e desenvolvimento
------------------------

* Install external dependencies: **``npm install``**
* Run the test suite without coverage: **``npm test``**
* Run the test suite with coverage: **``npm run testdox``**

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
