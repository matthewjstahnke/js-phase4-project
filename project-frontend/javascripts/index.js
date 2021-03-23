function resetFormInputs() {
    titleInput().value = "";
    contentInput().value = "";
}

function resetMain() {
    main().innerHTML = "";
}

function formLinkEvent() {
    formLink().addEventListener("click", function (e) {
        e.preventDefault();

        Blog.renderForm();
    });
}

function blogsLinkEvent() {
    blogsLink().addEventListener("click", function (e) {
        e.preventDefault();
        console.log(this);
        Blog.renderBlogs();
    });
}

function mazeChaseLinkEvent() {
    mazeChaseLink().addEventListener("click", function (e){
        e.preventDefault();
        console.log(this);
        MazeChase.renderGrid();
        console.log(grid);
        MazeChase.createBoard(grid);

    })
}

document.addEventListener("DOMContentLoaded", function () {
    Blog.getBlogs();
    formLinkEvent();
    blogsLinkEvent();
    mazeChaseLinkEvent();
    MazeChase.everything();
});