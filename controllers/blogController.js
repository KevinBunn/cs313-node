const blogModel = require('../models/blogModel');

function handleBlog(req, res) {
    blogModel.getAllPosts(function (err, results) {
        if (err)
            console.log(err);
        else {
            console.log(JSON.stringify(results));
            let resultsJson = JSON.parse(JSON.stringify(results));
            let tracker = 0;
            resultsJson["rows"].forEach(function(row) {
                blogModel.getUserInfo(row.admin_id, function(username) {
                    row.admin_id = username;
                    tracker++;
                    console.log(tracker,resultsJson["rows"].length);
                    if (tracker == resultsJson["rows"].length){
                        console.log("getting ready to load");
                        res.locals.blogPostJson = resultsJson;
                        //res.locals.username = username;
                        res.render("pages/index");
                    }
                });
            });
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

function handleLogin(req, res) {
    blogModel.login(req.body.username, req.body.password, function(err, result) {
        // TODO: see if login was valid. else send bad login
       res.json(result);
    });
}

module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup,
    handleSinglePost: handleSinglePost,
    handleNewPost: handleNewPost,
    handleLogin: handleLogin
};