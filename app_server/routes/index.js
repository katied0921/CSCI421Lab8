var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);
router.post('/add', ctrlBlog.addPost);
router.get('/edit/:id', ctrlBlog.edit);
router.post('/edit/:id', ctrlBlog.editPost);
router.get('/delete/:id', ctrlBlog.delete);
router.post('/delete/:id', ctrlBlog.deletePost);

module.exports = router;
