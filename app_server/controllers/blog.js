var request = require('request');
// Set default URL
var apiOptions = {
    server : "http://3.230.219.35:80"
};

// Displays an error on a webpage
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  // Can I delete this or do I need to copy the generic-text file from the repo?
  res.render('generic-text', {
    title : title,
    content : content
  });
};

// /* GET blog list */      
// module.exports.list = function(req, res){
//   var requestOptions, path;
//   path = '/api/blogsList';
//   requestOptions = { 
//       url : apiOptions.server + path,
//       method : "GET",
//       json : {},
//       qs : {} 
//       };
//   request(
//       requestOptions,
//       function(err, response, body) {
//         renderListPage(req, res, body);
//       }
//   );
// };

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
  res.render('bloglist', {
      title: 'Blog List',
      pageHeader: {
          title: 'Blog List'
      },
      blogs: responseBodys
  });
};                

/* Blog Add */
module.exports.add = function(req, res) {
  res.render('blogadd', { title: 'Add Blog' });
};    

// /* Blog Add Post */
// module.exports.addPost = function(req, res){
//   var requestOptions, path, postdata;
//   path = '/api/blogs';
//   // JSON representing the data that will be added in the new post
//   postdata = {
//       blogTitle: req.body.blogTitle,
//       blogText: req.body.blogText,
//       createdOn: req.body.createdOn
//   }; 
  
//   requestOptions = {
//     url : apiOptions.server + path,
//     method : "POST",
//     json : postdata
//   };
  
//   request(
//     requestOptions,
//     function(err, response, body) {
//       // Sends user back to the Blog List page after successfully adding a blog
//       if (response.statusCode === 201) {
//             res.redirect('/list');
//        } else {
//             _showError(req, res, response.statusCode);
//        } 
//     }
//   ); 
// };                    

// Get edit blog page.
module.exports.edit = function(req, res) {
    res.render('blogedit', { title: 'Edit Blog'});
};

/* Blog Edit Get*/
// You need to do both a GET and a PUT to edit a blog.
module.exports.edit = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/:" + req.params.id;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  }; 
  request(
      requestOptions,
      function(err, response, body) {
              renderEditPage(req, res, body);
      }
  );
};


/* Render the blog edit page */
var renderEditPage = function(req, res, responseBody){
  res.render('blogedit', {
      title: 'Edit Blog',
      pageHeader: {
          title: 'Edit Blog'
      },
      blog: responseBody
  });
};


/* Blog Edit Post */
// You need to do both a GET and a PUT to edit a blog.
module.exports.editPost = function(req, res){
  var requestOptions, path, postdata;
  var id = req.params.id;
  path = '/api/blogs/:' + id;
  // JSON representing the data that will be added in the edited post
  postdata = {
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      createdOn: req.body.createdOn
  };

  requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : postdata
  };

  request(
    requestOptions,
          function(err, response, body) {
              // Sends user back to the Blog List page after successfully editing a blog
              if (response.statusCode === 201) {
                  res.redirect('/list');
              } else {
                  _showError(req, res, response.statusCode);
              }
          }
  );
};


/* Book Delete */
// You need to do both a GET and a DELETE to delete a blog
module.exports.delete = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/:" + req.params.id;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
requestOptions,
      function(err, response, body) {
          renderDeletePage(req, res, body);
      }
  );
};

/* Render the blook delete page */
var renderDeletePage = function(req, res, responseBody){
      res.render('blogdelete', {
      title: 'Delete Blog',
      pageHeader: {
              title: 'Delete Blog'
      },
      blog: responseBody
  });
};

/* Book Delete Post */
// You need to do both a GET and a DELETE to delete a blog
module.exports.deletePost = function(req, res){
  var requestOptions, path, postdata;
  var id = req.params.id;
  path = '/api/blogs/:' + id;

  requestOptions = {
    url : apiOptions.server + path,
          method : "DELETE",
          json : {}
  };

  request(
      requestOptions,
      function(err, response, body) {
          // Sends user back to the Blog List page after successfully deleting a blog
          if (response.statusCode === 204) {
              res.redirect('/list');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};                    