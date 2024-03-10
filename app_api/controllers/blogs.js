var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

// Controller for List Blogs page.
module.exports.blogsList = function(req, res){
    Blog
      .find()
      .exec(function(err, res) {
        if (!res) {
          sendJSONresponse(res, 404, {
            "message": "no blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(res);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

// Helper function that creates a list of blogs.
var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.createdOn,
      _id: obj._id
    });
  });
  return blogs;
};

// Controller to read one blog.
module.exports.blogsReadOne = function(req, res){
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

// Controller for Add Blog page.
module.exports.blogsAdd = function(req, res){
  console.log(req.body);
  Blog.create({
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText,
    createdOn: req.bogy.createdOn
  }, function(err, blog) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(blog);
      sendJSONresponse(res, 201, blog);
    }
  });
};

// Controller for Edit Blog page.
module.exports.blogsEdit = function(req, res){
  console.log("Updating a blog entry with id of " + req.params.id);
    console.log(req.body);
    Blog
  	  .findOneAndUpdate(
	     { _id: req.params.id },
 	     { $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText}},
	     function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    );
};

// Controller for Delete Blog page.
module.exports.blogsDelete = function(req, res){
  var blogid = req.params.blogid;
  if (blogid) {
    Blog
      .findByIdAndRemove(blogid)
      .exec(
        function(err, blog) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Blog id " + blogid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No blogid"
    });
  }
};