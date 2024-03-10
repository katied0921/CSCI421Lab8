var express = require('express');
var router = express.Router();
// Include controller file.
var ctrlBlogs = require('../controllers/blogs');

// Do these routes look right? Do I need the /api?
// Route for list blogs.
router.get('/api/blogsList', ctrlBlogs.blogsList);
// Route for add blog.
router.post('/api/blogsAdd', ctrlBlogs.blogsAdd);
// Route to read one blog.
router.get('/api/blogsReadOne:blogid', ctrlBlogs.blogsReadOne);
// Route for edit blog.
router.put('/api/blogsEdit:blogid', ctrlBlogs.blogsEdit);
// Route for delete blog.
router.delete('/api/blogsDelete:blogid', ctrlBlogs.blogsDelete);

// Export routes.
module.exports = router;