const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');

const controller = requre('./controllers/blogController');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())     // to support JSON-encoded bodies
    .use(express.urlencoded(extended = true))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', controller.handleBlog)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
