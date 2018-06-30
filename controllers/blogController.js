const blogModel = require('../models/blogModel');

function handleBlog(req, res) {
    blogModel.getAllPosts(function (err, results) {
        if (err)
            console.log(err)
        else {
            console.log(JSON.stringify(results));
            res.locals.blogPostJson = JSON.parse(JSON.stringify(results));
            res.render("pages/index");
        }
    })
}

function handleSignup(req, res) {
    res.render("pages/signup");
}

function handleSinglePost(req, res) {

    blogModel.getSinglePost(req.params.id, function(err, results) {
        if (err)
            console.log(err)
        else {
            console.log(JSON.stringify(results));
            res.locals.blogPostJson = JSON.parse(JSON.stringify(results));
            res.render("pages/index");
        }
    });
}


module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup,
    handleSinglePost: handleSinglePost
};