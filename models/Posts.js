var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Post', PostSchema);