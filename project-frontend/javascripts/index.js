function resetFormInputs() {
    titleInput().value = "";
    contentInput().value = "";
}

function resetMain() {
    main().innerHTML = "";
}

function showSearchBar() {
    document.getElementById("bar").style.display = 'block';
}

function hideSearchBar() {
    document.getElementById("bar").style.display = 'none';
}

function formLinkEvent() {
    formLink().addEventListener("click", function (e) {
        e.preventDefault();
        hideSearchBar();

        Blog.renderForm();
    });
}

function blogsLinkEvent() {
    blogsLink().addEventListener("click", function (e) {
        e.preventDefault();
        console.log(this);
        showSearchBar();
        Blog.renderBlogs();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    Blog.getBlogs();
    showSearchBar();
    formLinkEvent();
    blogsLinkEvent();
    Blog.listenforKeyDown();
});