var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);
router.get('/edit', ctrlBlog.edit);
router.get('/delete', ctrlBlog.delete);

module.exports = router;
