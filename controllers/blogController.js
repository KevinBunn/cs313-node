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
            res.redirect('/');
        }
    });
}

function handleSinglePost(req, res) {
    if (req.session.user) {
        console.log(req.session.user);
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;

    }
    else {
        res.locals.loggedIn = false;
    }
    console.log("getting single post")
    blogModel.getSinglePost(req.params.id, function(err, postResults) {
        if (err)
            console.log(err);
        else {
            console.log("got a single post");
            console.log(JSON.stringify(postResults));
            let postJson = JSON.parse(JSON.stringify(postResults));
            blogModel.getUserInfo(postJson["rows"][0]["admin_id"], function(adminName) {
                console.log("got user info for post");
                postJson["rows"][0]["admin_id"] = adminName;
                res.locals.blogPostJson = postJson;
                blogModel.getPostComments(req.params.id, function(err, commentResults) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("got comments info");
                        let commentsJson = JSON.parse(JSON.stringify(commentResults));
                        if (commentsJson["rows"].length > 0) {
                            let tracker = 0;
                            commentsJson["rows"].forEach(function (row) {
                                blogModel.getUserInfo(row.user_id, function (username) {
                                    console.log("got user info for comments");
                                    row.user_id = username;
                                    tracker++;
                                    //console.log(tracker,resultsJson["rows"].length);
                                    if (tracker === commentsJson["rows"].length) {
                                        console.log("getting ready to load the individual post");
                                        res.locals.commentsJson = commentsJson;
                                        res.render("pages/post");
                                    }
                                });
                            });
                        }
                        else {
                            res.locals.commentsJson = commentsJson;
                            res.render("pages/post");
                        }
                    }
                });
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

function handleNewComment(req, res) {
    blogModel.addComment(req.body.postId, req.body.content, req.session.user, function(err, result) {
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
    handleNewComment: handleNewComment,
    handleLogin: handleLogin,
    handleLogout: handleLogout
};