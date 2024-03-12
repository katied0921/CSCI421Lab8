var express = require('express');
var router = express.Router();
// Include controller file.
var ctrlBlogs = require('../controllers/blogs');

// Route for list blogs.
router.get('/blogs', ctrlBlogs.blogsList);
// Route for add blog.
router.post('/blogs', ctrlBlogs.blogsAdd);
// Route to read one blog.
router.get('/blogs:id', ctrlBlogs.blogsReadOne);
// Route for edit blog.
router.put('/blogs:id', ctrlBlogs.blogsEdit);
// Route for delete blog.
router.delete('/blogs:id', ctrlBlogs.blogsDelete);

// Export routes.
module.exports = router;