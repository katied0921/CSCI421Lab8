var express = require('express');
var router = express.Router();
var jwt = require('express-jwt'); 
var auth = jwt({   // Lab 6
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
  });
// Include controller file.
var ctrlBlogs = require('../controllers/blogs');
// Lab 6
var ctrlAuth = require('../controllers/authentication');

// Route for list blogs.
router.get('/blogs', ctrlBlogs.blogsList);
// Route for add blog. Lab 6- added auth param.
router.post('/blogs', auth, ctrlBlogs.blogsAdd);
// Route to read one blog.
router.get('/blogs/:id', ctrlBlogs.blogsReadOne);
// Route for edit blog. Lab 6- added auth param.
router.put('/blogs/:id', auth, ctrlBlogs.blogsEdit);
// Route for delete blog. Lab 6- added auth param.
router.delete('/blogs/:id', auth, ctrlBlogs.blogsDelete);
// Lab 6- Route for register.
router.post('/register', ctrlAuth.register);
// Lab 6- Route for login.
router.post('/login', ctrlAuth.login);

// Export routes.
module.exports = router;