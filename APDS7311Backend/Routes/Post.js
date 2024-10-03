import express from 'express';

const router = express.Router();

router.get('/posts', (req, res) => {
    res.send('List of posts');
});

   // Get all posts
router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
  });
  
  // Get a post by ID
  router.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch post', error: err.message });
    }
  });
  
  // Create a new post
  router.post('/posts', async (req, res) => {
    try {
      const { title, content, author } = req.body;
  
      if (!title || !content || !author) {
        return res.status(400).json({ message: 'All fields (title, content, author) are required' });
      }
  
      const newPost = new Post({ title, content, author });
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
  });
  
  // Update a post by ID
  router.put('/posts/:id', async (req, res) => {
    try {
      const { title, content, author } = req.body;
  
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content, author },
        { new: true, runValidators: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
  });
  
  // Delete a post by ID
  router.delete('/posts/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
  });
  

export default router;