var express = require('express');
var router = express.Router();
// Include controller file.
var ctrlBlogs = require('../controllers/blogs');

// Route for list blogs.
router.get('/blogs', ctrlBlogs.blogsList);
// Route for add blog.
router.post('/blogs', ctrlBlogs.blogsAdd);
// Route to read one blog.
router.get('/blogs/:blogid', ctrlBlogs.blogsReadOne);
// Route for edit blog.
router.put('/blogs/:blogid', ctrlBlogs.blogsEdit);
// Route for delete blog.
router.delete('/blogs/:blogid', ctrlBlogs.blogsDelete);

// Export routes.
module.exports = router;