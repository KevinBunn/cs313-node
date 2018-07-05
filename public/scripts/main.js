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
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}