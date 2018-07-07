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

function createNewPost(title, content, id, admin, callback) {
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
    blogAuthor.innerHTML = `by: ${admin}`;
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

function manageNavbarLogin(user) {
    if (user[0]["isAdmin"]) {
        if (document.querySelector('#show-new-post-button')) {
            document.getElementById('show-new-post-button').setAttribute('style','display: block');
        }
        else {
            let newPostSpan = document.createElement('span');
            newPostSpan.setAttribute('onclick', "showNewPostForm()");
            newPostSpan.setAttribute('id', "show-new-post-button");
            newPostSpan.innerHTML = "Submit New Post";
            document.getElementsByClassName('navbar-left')[0].appendChild(newPostSpan);
        }
    }
    if (document.querySelector('#user-dropdown')) {
        document.getElementById('user-dropdown').setAttribute('style','display: block');
    }
    else {
        let newDropdown = document.createElement('div');
        newDropdown.classList.add('dropdown');
        newDropdown.setAttribute('id', "user-dropdown");
        let dropButton = document.createElement('div');
        dropButton.setAttribute('onclick', 'dropdownUser()');
        dropButton.classList.add('dropbtn');
        dropButton.innerHTML = user[0]["name"];
        newDropdown.appendChild(dropButton);
        let dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-content');
        dropdownMenu.setAttribute('id', 'dropdown-menu-user');
        let newLink = document.createElement('a');
        newLink.setAttribute('onclick', 'logout()');
        newLink.setAttribute('href', '#');
        newLink.innerHTML = "Logout";
        dropdownMenu.appendChild(newLink);
        newDropdown.appendChild(dropdownMenu);
        document.getElementsByClassName('navbar-right')[0].appendChild(newDropdown);
    }

    document.getElementById('login').setAttribute('style','display: none');

}

function manageNavbarLogout() {
    if (document.querySelector('#login')) {
        document.getElementById('login').setAttribute('style','display: block');
    }
    else {
        let newDropdown = document.createElement('div');
        newDropdown.classList.add('dropdown');
        newDropdown.setAttribute('id', "login");
        let dropButton = document.createElement('div');
        dropButton.setAttribute('onclick','dropdownLogin()');
        dropButton.classList.add('dropbtn');
        dropButton.innerHTML = "Login";
        newDropdown.appendChild(dropButton);
        let dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-content');
        dropdownMenu.setAttribute('id', 'dropdown-menu-login');
        let newForm = document.createElement('form');
        newForm.classList.add('dropdown-form');
        let usernameInput = document.createElement('input');
        usernameInput.classList.add('custom-input');
        usernameInput.setAttribute('type', 'text');
        usernameInput.setAttribute('id', 'txtUsername');
        usernameInput.setAttribute('placeholder','username');
        let passwordInput = document.createElement('input');
        passwordInput.classList.add('custom-input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'passwordInput');
        passwordInput.setAttribute('placeholder','password');
        let newLink = document.createElement('a');
        newLink.classList.add('custom-button');
        newLink.setAttribute('href', '/signin.html');
        newLink.innerHTML = "Signup";
        let loginButton = document.createElement('div');
        loginButton.setAttribute('onclick', 'login()');
        loginButton.classList.add('custom-button');
        loginButton.innerHTML = "Login";
        newForm.appendChild(usernameInput);
        newForm.appendChild(passwordInput);
        newForm.appendChild(newLink);
        newForm.appendChild(loginButton);
        dropdownMenu.appendChild(newForm);
        newDropdown.appendChild(dropdownMenu);
        document.getElementsByClassName('navbar-right')[0].appendChild(newDropdown);
    }

    if (document.querySelector('#show-new-post-button')) {
        document.getElementById('show-new-post-button').setAttribute('style', 'display: none');
    }

    document.getElementById('user-dropdown').setAttribute('style', 'display: none');
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
            createNewPost(title, content, resJson["id"], resJson["admin"], function (newBlogPost) {
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
            manageNavbarLogin(resJson["user"]);
        }
    });
}

function logout() {
    callAjax('/logout', function() {
        manageNavbarLogout();
    });
}

function callAjax(url, callback) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function callAjaxLogin(url, username, password, callback) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    };
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
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`title=${title}&content=${content}`);
}