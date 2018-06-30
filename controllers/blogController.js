const blogModel = require('../models/blogModel');

function handleBlog(req, res) {
    blogModel.getPosts(function (err, results) {
        if (err)
            console.log(err)
        else {
            res.locals.blogPostJson = results;
            res.render("pages/index");
        }
    })
}

function handleSignup(req, res) {
    res.render("pages/signup");
}

module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup
};