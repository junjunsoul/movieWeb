var Comment = require('../models/Comment');

exports.save = function(req, res) {
    var _comment = req.body.comment;
    var _movieId = _comment.movie;
    var _cid = _comment.cid;
    var _tid = _comment.tid;
    if (_cid) {
        Comment.findById(_cid, function(err, comment) {
            var reply = {
                from: _comment.from,
                to: _cid,
                content: _comment.content
            }
            comment.reply.push(reply);
            comment.save(function(err, comment) {
                if (err) console.log(err);
                res.redirect('/movie/' + _movieId);
            });
        });
    } else {
        var comment = new Comment(_comment);
        comment.save(function(err, comment) {
            if (err) console.log(err);
            res.redirect('/movie/' + _movieId);
        });
    }
};
