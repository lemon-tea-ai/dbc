const express = require('express');
const fs = require('fs').promises;
const app = express();
// Use environment variable for port
const port = process.env.PORT || 3000;

// Add CORS for GitHub Pages
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://lemon-tea-ai.github.io/dbc/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// POST endpoint for new blog posts
app.post('/api/posts', async (req, res) => {
    try {
        // Read existing posts
        const postsData = await fs.readFile('posts.json', 'utf8');
        const posts = JSON.parse(postsData);
        
        // Add new post
        posts.posts.unshift(req.body);
        
        // Write updated posts back to file
        await fs.writeFile('posts.json', JSON.stringify(posts, null, 4));
        
        res.status(200).json({ message: 'Post added successfully' });
    } catch (error) {
        console.error('Error handling post:', error);
        res.status(500).json({ error: 'Failed to add post' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 