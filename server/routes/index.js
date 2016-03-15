var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cool = require('cool-ascii-faces');

//Creation of Post Schema (Names)
var PostSchema = new mongoose.Schema({
    name: String
});
mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET posts. */
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts){
        if(err){ return next(err); }
        res.json(posts);
    });
});

/* POST new posts. */
router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err, post){
        if(err){ return next(err); }
        res.json(post);
    });
});

/* DELETE posts */
router.delete('/posts/:post', function(req, res, next) {
    Post.findOneAndRemove({ _id: req.params.post }, function(err, post){
        if (err) { return next(err); }
        res.json(post);
        console.log('Post ' + req.params.post +' successfully deleted!');
    });
});

router.get('/cool', function(request, response) {
  response.send(cool());
});

module.exports = router;
