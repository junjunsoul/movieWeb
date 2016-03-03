var Index=require('../app/controller/index');
var Movie=require('../app/controller/movie');
var User=require('../app/controller/user');
var Comment=require('../app/controller/comment');
module.exports=function(app) {
    app.use(function(req,res,next){
       app.locals.user=req.session.user;
       next();
    });
    //index
    app.get('/', Index.index);
    //user
    app.get('/loginout', User.loginout);
    app.post('/user/singnup', User.singnup);
    app.post('/user/singnin', User.singnin);
    app.get('/user/list',User.isLogin,User.isRole, User.list);
    app.get('/login',User.login);
    app.get('/register',User.register);
    app.delete('/user/list',User.isLogin,User.isRole, User.del);
    //movie
    app.get('/movie/:id', User.isLogin,Movie.detail);
    app.get('/admin/list',User.isLogin,User.isRole, Movie.list);
    app.delete('/admin/list',User.isLogin,User.isRole, Movie.del);
    app.get('/admin/movie',User.isLogin,User.isRole, Movie.movie);
    app.get('/movie/update/:id',User.isLogin,User.isRole, Movie.update);
    app.post('/admin/movie/new',User.isLogin,User.isRole, Movie.new);
    //comment
    app.post('/user/comment',User.isLogin,Comment.save);
};