const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');

router.post('/add-blog', blogController.addBlog);
router.get('/get-all-blogs', blogController.getAllBlogs);
router.get('/get-blog/:slug', blogController.getBlog);
router.get('/get-blog-keywords', blogController.getAllBlogKeywords);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
