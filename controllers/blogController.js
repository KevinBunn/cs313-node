const blogModel = require('../models/blogModel');

function handleBlog(req, res) {

    if (req.session.user) {
        console.log(req.session.user);
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;
    }
    else {
        res.locals.loggedIn = false;
    }

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
                    //console.log(tracker,resultsJson["rows"].length);
                    if (tracker === resultsJson["rows"].length){
                        console.log("getting ready to load");
                        res.locals.blogPostJson = resultsJson;
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
    blogModel.getSinglePost(req.params.id, function(err, postResults) {
        if (err)
            console.log(err);
        else {
            console.log(JSON.stringify(postResults));
            res.locals.blogPostJson = JSON.parse(JSON.stringify(postResults));
            blogModel.getPostComments(req.params.id, function(err, commentResults) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.locals.commentsJson = JSON.parse(JSON.stringify(commentResults));
                    res.render("pages/post");
                }
            });
        }
    });
}

function handleNewPost(req, res) {
    blogModel.addPost(req.body.title, req.body.content, req.session.user, function(err, result) {
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
        if(err) {
            console.log(err);
        }
        else {
            if (result["status"] === "success") {
                req.session.user = result["user"];
                res.json({status: 'success', user: req.session.user});
            }
        }
    });
}

function handleLogout(req, res) {
    req.session.destroy(function (err) {
        if (err)
            console.log(err);
        else
            res.json({status: "success"});
    });
}

module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup,
    handleSinglePost: handleSinglePost,
    handleNewPost: handleNewPost,
    handleLogin: handleLogin,
    handleLogout: handleLogout
};