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

function loadPosts(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const postsHTML = data.posts.map(post => {
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
}

// Add click event listeners to tabs
document.getElementById('mlTab').addEventListener('click', () => {
    loadPosts('ml-posts.json');
    // Update active tab styling
    updateActiveTab('mlTab');
});

document.getElementById('speakingTab').addEventListener('click', () => {
    loadPosts('speaking-posts.json');
    // Update active tab styling
    updateActiveTab('speakingTab');
});

function updateActiveTab(activeTabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    // Add active class to clicked tab
    document.getElementById(activeTabId).classList.add('active');
}

// Load ML posts by default
loadPosts('ml-posts.json');