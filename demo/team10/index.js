const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use( bodyParser.json() )     // to support JSON-encoded bodies
    .use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/', function (req, res) {
        
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
