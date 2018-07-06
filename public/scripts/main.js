function showNewPostForm() {
    let newPostForm = document.getElementById('new-post-container');
    newPostForm.setAttribute('style','display: block');
}
function hideNewPostForm() {
    let newPostForm = document.getElementById('new-post-container');
    newPostForm.setAttribute('style','display: none');
}

function dropdownLogin() {
    document.getElementById('dropdown-menu-login').classList.add('show');
}
function dropdownUser() {
    document.getElementById('dropdown-menu-user').classList.add('show');
}

function createNewPost(title, content, id, callback) {
    let newBlogPost = document.createElement('div');
    newBlogPost.setAttribute('class', 'blog-post');
    let blogHeader = document.createElement('div');
    blogHeader.setAttribute('class', 'post-header');
    let blogTitle = document.createElement('h1');
    blogTitle.classList.add('title');
    blogTitle.innerHTML = title;
    blogHeader.appendChild(blogTitle);
    let blogAuthor = document.createElement('div');
    blogAuthor.classList.add('author');
    blogAuthor.innerHTML = "1";
    blogHeader.appendChild(blogAuthor);
    newBlogPost.appendChild(blogHeader);
    let blogContent = document.createElement('p');
    blogContent.innerHTML = content;
    newBlogPost.appendChild(blogContent);
    let blogFooter = document.createElement('div');
    blogFooter.classList.add('post-footer');
    let commentsLink = document.createElement('a');
    commentsLink.setAttribute('href', `/post/${id}`);
    commentsLink.innerHTML = "comments";
    blogFooter.appendChild(commentsLink);
    newBlogPost.appendChild(blogFooter);

    callback(newBlogPost);
}

window.onclick = function(event) {
    //console.log(event.target);
    if (!event.target.matches('.dropbtn') && !event.target.matches('.custom-input')) {

        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function addPost() {
    let title = document.getElementById("txtTitle").value;
    let content = tinymce.get("tinymce").getContent();
    console.log(content);
    callAjaxPost(`/addPost`, title, content, function(res) {
        console.log(`back from ajax call with response: ${res}`);
        resJson = JSON.parse(res);
        if (resJson["status"] === "success") {
            createNewPost(title, content, resJson["id"], function (newBlogPost) {
                hideNewPostForm();
                document.getElementById("main-content").prepend(newBlogPost);
            });
        }
        else {
            console.log("there was and error in the ajax call");
        }
    });
}

function login() {
    let username = document.getElementById('txtUsername').value;
    let password = document.getElementById('passwordInput').value;
    console.log(username,password);
    callAjaxLogin('/login', username, password, function(res) {
        console.log(`back from ajax call with response: ${res}`);
        resJson = JSON.parse(res);
        if (resJson["status"] === "success") {
            console.log("logged in!");
        }
    });
}

function callAjaxLogin(url, username, password, callback) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`username=${username}&password=${password}`);
}

function callAjaxPost(url, title, content, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`title=${title}&content=${content}`);
}