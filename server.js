const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');

// get the controller
const controller = require('./controllers/blogController');

express()
    .use(express.static(path.join(__dirname, '/public')))
    .use(express.json())     // to support JSON-encoded bodies
    .use(express.urlencoded(extended = true)) // mainly used for post
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', controller.handleBlog)
    .get('/signup', controller.handleSignup)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
