// Configure marked to use highlight.js for code blocks
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

fetch('posts.json')
    .then(response => response.json())
    .then(data => {
        const postsHTML = data.posts.map(post => {
            // Parse the content as markdown if it starts with a markdown fence
            const content = post.content.startsWith('# ') ? 
                          marked.parse(post.content) : 
                          post.content;
            
            return `
                <article class="blog-post">
                    <div class="post-meta">
                        <span class="date">${post.date}</span>
                        <span class="category">${post.category}</span>
                    </div>
                    <div class="post-content">
                        ${content}
                    </div>
                </article>
            `;
        }).join('');
        
        document.getElementById('blogPost').innerHTML = postsHTML;
        
        // Initialize syntax highlighting
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    });