var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogText: String,
    createdOn: {type: Date, "default": Date.now},
    postedBy: String,
    userEmail: String,
    likes: Number,
    loves: Number
});

mongoose.model('Blog', blogSchema);