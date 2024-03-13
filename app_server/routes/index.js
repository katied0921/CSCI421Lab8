var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);
router.post('/add', ctrlBlog.addPost);
router.get('/edit', ctrlBlog.edit);
router.post('/edit', ctrlBlog.editPost);
router.get('/delete', ctrlBlog.delete);
router.post('/delete', ctrlBlog.deletePost);

module.exports = router;
