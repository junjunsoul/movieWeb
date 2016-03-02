var Movie = require('../models/movie');
var _ = require('underscore');
exports.list=function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err)
            console.log(err);
        res.render('list', {
            title: "imooc 列表",
            movies: movies
        });
    });
};

exports.del=function(req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }

        })
    }
};
exports.movie=function(req, res) {
    res.render('admin', {
        title: "imooc 后台",
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
};

exports.update=function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'imooc 更新',
                movie: movie
            });
        });
    }
};
exports.new=function(req, res) {

    var id = req.body.movie._id;

    var movieObj = req.body.movie;
    var _movie;
    if (id != 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) console.log(err);
                res.redirect('/movie/' + movie._id);
            });

        });
    } else {
        if (movieObj.title) {
            _movie = new Movie({
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.country,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });
            _movie.save(function(err, movie) {
                if (err) console.log(err);
                res.redirect('/movie/' + movie._id);
            });
        }
    }
};
exports.detail=function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        if (err)
            console.log(err);
        res.render('detail', {
            title: "imooc 详情页",
            movie: movie
        });
    })

};