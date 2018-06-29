
function handleBlog(req, res) {
    res.render("pages/index");
}

function handleSignup(req, res) {
    res.render("pages/signup");
}

module.exports = {
    handleBlog: handleBlog,
    handleSignup: handleSignup
};