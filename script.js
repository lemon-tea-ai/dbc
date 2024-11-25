fetch('posts.json')
    .then(response => response.json())
    .then(data => {
        const postsHTML = data.posts.map(post => `
            <article class="blog-post">
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <span class="date">${post.date}</span>
                    <span class="category">${post.category}</span>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
            </article>
        `).join('');
        
        document.getElementById('blogPost').innerHTML = postsHTML;
    });