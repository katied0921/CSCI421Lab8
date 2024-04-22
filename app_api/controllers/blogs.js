var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
// Lab 7- trying to get user name connected to post.
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

// Controller for List Blogs page.
module.exports.blogsList = function(req, res){
    Blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
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
      postedBy: obj.postedBy,
      // Might not need user email.
      userEmail: obj.userEmail,
      likes: obj.likes,
      loves: obj.loves,
      _id: obj._id
    });
  });
  return blogs;
};

// Controller to read one blog.
module.exports.blogsReadOne = function(req, res){
  console.log('Finding blog details', req.params);
  if (req.params && req.params.id) {
    console.log('blogid = ' + req.params.id);
    Blog
      .findById(req.params.id)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found" + req.params.id
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
  Blog
    .create({
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      createdOn: req.body.createdOn,
      postedBy: req.body.postedBy,
      userEmail: req.body.userEmail,
      likes: req.body.likes,
      loves: req.body.loves
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
 	     { $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText, "likes": req.body.likes, "loves": req.body.loves}},
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
  console.log("Deleting blog entry with id of " + req.params.id);
  console.log(req.body);
  var blogid = req.params.id;
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