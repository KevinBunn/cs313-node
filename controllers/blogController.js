const blogModel = require('../models/blogModel');

function handleBlog(req, res) {
    blogModel.getAllPosts(function (err, results) {
        if (err)
            console.log(err);
        else {
            console.log(JSON.stringify(results));
            let resultsJson = JSON.parse(JSON.stringify(results));
            let username = blogModel.getUserInfo(resultsJson["rows"][0]["admin_id"]);
            console.log(username);
            res.locals.blogPostJson = resultsJson;
            res.locals.username = username;
            res.render("pages/index");
        }
    })
}

function handleSignup(req, res) {
    blogModel.addUser(req.body.username, req.body.password, req.body.email, function(err) {
        if(err)
            console.log(err);
        else {
            handleBlog(req, res);
        }
    });
}

function handleSinglePost(req, res) {
    blogModel.getSinglePost(req.params.id, function(err, results) {
        if (err)
            console.log(err);
        else {
            console.log(JSON.stringify(results));
            res.locals.blogPostJson = JSON.parse(JSON.stringify(results));
            res.render("pages/post");
        }
    });
}

function handleNewPost(req, res) {
    blogModel.addPost(req.body.title, req.body.content, 1, function(err, result) {
        if(err){
            console.log(err);
            res.json({success: false});
        }
        else {
            res.json(result);
        }
    });
}

module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup,
    handleSinglePost: handleSinglePost,
    handleNewPost: handleNewPost
};