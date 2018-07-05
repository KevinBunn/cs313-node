function showNewPostForm() {
    let newPostForm = document.getElementById('new-post-container');
    newPostForm.setAttribute('style','display: block');
}
function hideNewPostForm() {
    let newPostForm = document.getElementById('new-post-container');
    newPostForm.setAttribute('style','display: none');
}

function dropdown() {
    document.getElementById("dropdown-menu").classList.add('show');
}

window.onclick = function(event) {
    console.log(event.target);
    if (!event.target.matches('.dropbtn') && !event.target.matches('.custom-input')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}