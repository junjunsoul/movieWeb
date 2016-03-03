var Comment = require('../models/Comment');

exports.save = function(req, res) {
    var _comment = req.body.comment;
    var _movieId = _comment.movie;
    var comment = new Comment(_comment);
    comment.save(function(err, comment) {
        if (err) console.log(err);
        res.redirect('/movie/' + _movieId);
    });
};
