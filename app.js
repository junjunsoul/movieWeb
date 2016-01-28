/**
 * Created by Administrator on 2016-01-23.
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc');
mongoose.connection.on('error', function (err) {
    console.error('mongodb连接错误: ' + err);
    process.exit(-1);
});

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.locals.moment=require('moment');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('start server' + port);

app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err)
            console.log(err);
        res.render('index', {
            title: "imooc 首页",
            movies: movies
        });
    });

});

app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        if (err)
            console.log(err);
        res.render('detail', {
            title: "imooc 详情页",
            movie: movie
        });
    })

});

app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err)
            console.log(err);
        res.render('list', {
            title: "imooc 列表",
            movies: movies
        });
    });
});
app.delete('/admin/list',function(req,res){
    var id=req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }

        })
    }
});
app.get('/admin/movie', function (req, res) {
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
});

app.get('/movie/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 更新',
                movie: movie
            });
        });
    }
});
app.post('/admin/movie/new', function (req, res) {

    var id = req.body.movie._id;

    var movieObj = req.body.movie;
    var _movie;
    if (id!='undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err)console.log(err);
                res.redirect('/movie/' + movie._id);
            });

        });
    } else {
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
        _movie.save(function (err, movie) {
            if (err)console.log(err);
            res.redirect('/movie/' + movie._id);
        });
    }
});


