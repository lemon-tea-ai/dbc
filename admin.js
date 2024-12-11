const API_URL = 'https://dbc-4k9b.onrender.com';

document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newPost = {
        title: formData.get('title'),
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        category: formData.get('category'),
        content: formData.get('content')
    };

    try {
        const response = await fetch(`${API_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        
        if (response.ok) {
            alert('Post added successfully!');
            e.target.reset();
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
}); 