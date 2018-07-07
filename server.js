const express = require('express');
const session = require('express-session')
const PORT = process.env.PORT || 5000;
const path = require('path');

// get the controller
const controller = require('./controllers/blogController');

express()
    .use(express.static(path.join(__dirname, '/public')))
    .use(express.json())     // to support JSON-encoded bodies
    .use(express.urlencoded(extended = true)) // mainly used for post
    .use(session({ secret: 'Blind Grandma', cookie: { maxAge: 60000 }}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', controller.handleBlog)
    .get('/post/:id', controller.handleSinglePost)
    .get('/logout'), controller.handleLogout)
    .post('/addUser', controller.handleSignup)
    .post('/addPost', controller.handleNewPost)
    .post('/login', controller.handleLogin)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
