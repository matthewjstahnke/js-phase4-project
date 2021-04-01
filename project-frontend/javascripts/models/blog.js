class Blog {
    static all = []

    constructor(attr) {
        this.id = attr.id;
        this.title = attr.title;
        this.content = attr.content;
        this.author = attr.author;
        this.likes_count = attr.likes_count;
    }

    render() {
        let div = document.createElement("div");
        let h4 = document.createElement("h4");
        let byAuthor = document.createElement('p');
        let p = document.createElement("p");
        let deleteLink = document.createElement("a");
        let editLink = document.createElement("a");
        let blogsDiv = document.getElementById("blogs")
        let likeLink = document.createElement("button")

        editLink.dataset.id = this.id;
        editLink.setAttribute("href", "#")
        editLink.innerText = "Edit"

        deleteLink.dataset.id = this.id
        deleteLink.setAttribute("href", "#")
        deleteLink.innerText = "Delete"

        likeLink.dataset.id = this.id
        likeLink.setAttribute("href", "#")
        likeLink.innerText = `Likes ${this.likes_count}`

        editLink.addEventListener("click", Blog.editBlog);
        deleteLink.addEventListener("click", Blog.deleteBlog)
        likeLink.addEventListener("click", Blog.likeBlog)

        h4.innerText = this.title;
        byAuthor.innerText = `By: ${this.author.name}`;
        p.innerText = this.content;

        div.appendChild(h4);
        div.appendChild(byAuthor);
        div.appendChild(p);
        div.appendChild(editLink);
        div.appendChild(deleteLink);
        div.appendChild(likeLink);

        blogsDiv.appendChild(div);
    }

    save() {
        Blog.all.push(this)
    }

    static create(attr) {
        let blog = new Blog(attr);
        blog.save();
        return blog;
    }

    static createFromCollection(collection) {
        collection.forEach(data => Blog.create(data))
    }

    /** Blog Templates **/

    static blogsTemplate() {
        return `
        <h3>List Of Blogs</h3>
        <div id="blogs"></div>
        `;
    }

    static formTemplate() {
        return `
        <h3>Create Blog</h3>
        <form id="form">
            <div class="input-field">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" />
            </div>
            <div class="input-field">
                <label for="author">Author</label>
                <input type="text" name="author" id="author" />
            </div>
            <div class="input-field">
                <label for="content">Content</label><br />
                <textarea name="content" id="content" cols="30" rows="10"></textarea>
            </div>
            <input type="submit" value="Create Blog" />
        </form>
        `;
    }

    static editFormTemplate(blog) {
        return `
        <h3>Edit Blog</h3>
        <form id="form" data-id="${blog.id}">
            <div class="input-field">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" value="${blog.title}" />
            </div>
            <div class="input-field">
                <label for="content">Content</label><br />
                <textarea name="content" id="content" cols="30" rows="10">${blog.content}</textarea>
            </div>
            <input type="submit" value="Edit Blog" />
        </form>
        `;
    }

    /** renders **/

    static renderForm() {
        resetMain();
        main().innerHTML = Blog.formTemplate();
        form().addEventListener("submit", Blog.submitForm);
    }

    static renderEditForm(blog) {
        resetMain();
        main().innerHTML = Blog.editFormTemplate(blog);
        form().addEventListener("submit", Blog.submitEditForm);
    }

    static renderBlogs() {
        resetMain();
        main().innerHTML = Blog.blogsTemplate();

        //Blog.all.forEach(blog => blog.render());
        const sorted = Blog.all.sort(function (a, b) {
            return b.likes_count - a.likes_count;
        })
        sorted.forEach(blog => blog.render());
    }

    static editBlog(e) {
        e.preventDefault();
        const id = e.target.dataset.id;

        const blog = Blog.all.find(function(blog) {
            return blog.id ==id;
        })

        Blog.renderEditForm(blog)
    }
    
    static submitForm(e) {
        e.preventDefault();

        let strongParams = {
            blog: {
                title: titleInput().value,
                content: contentInput().value,
                author_attributes: authorInput().value
            }
        }

        Api.post('/blogs', strongParams)
            .then(function(data) {
                Blog.create(data);
                Blog.renderBlogs();
            })
    }

    static submitEditForm(e) {
        e.preventDefault();

        let strongParams = {
            blog: {
                title: titleInput().value,
                content: contentInput().value
            }
        }

        const id = e.target.dataset.id;

        Api.patch("/blogs/" + id, strongParams)
            .then(function(data) {
                let b = Blog.all.find((b) => b.id == data.id);

                let idx = Blog.all.indexOf(b);

                Blog.all[idx] = new Blog(data);

                Blog.renderBlogs();
            })
    }

    static async getBlogs() {

        const data = await Api.get("/blogs");

        Blog.createFromCollection(data)
        Blog.renderBlogs();
    }

    static async deleteBlog(e) {
        e.preventDefault();
        

        let id = e.target.dataset.id;

        const data = await Api.delete(Api.blogPath + id);

        Blog.all = Blog.all.filter(function(blog){
            return blog.id !== data.id;
        })

        Blog.renderBlogs();
    }

    static likeBlog(e) {
        let likes = 0
        let id = e.target.dataset.id;

        
        fetch(`http://localhost:3000/blogs/`+ id)
        .then(resource => resource.json())
        .then((data) => {
            likes = data.likes_count
            
            let newLikes = likes +1
            
            let strongParams = {
                blog: {
                    likes_count: newLikes
                }
            }
            Api.patch("/blogs/" + id, strongParams)
            .then(function(data) {
                let b = Blog.all.find((b) => b.id == data.id);

                let idx = Blog.all.indexOf(b);

                Blog.all[idx] = new Blog(data);

                Blog.renderBlogs();
            })         
        })

    }

}