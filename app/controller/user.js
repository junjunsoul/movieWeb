
var User = require('../models/user');

exports.loginout=function(req,res){
    delete req.session.user;
    res.redirect('/');
};
exports.singnup=function(req, res) {
    var _user = req.body.user;
    User.find({ name: _user.name }, function(err, user) {
        if (err) console.log(err);
        if (user.length) {
            res.redirect('/');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) console.log(err);
                return  res.redirect('/user/list');
            });
        }
    });
};
exports.singnin=function(req, res) {
    var _user = req.body.user;
    var password = _user.password;
    User.findOne({ name: _user.name }, function(err, user) {
        if (err)
            console.log(err);
        if (user){
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    console.log(_user.name + ':用户不存在！');
                }
            });
        }else{
            console.log('用户不存在！');
            res.redirect('/');
        }
    });
};
exports.list=function(req, res) {
    User.fetch(function(err, users) {
        if (err)
            console.log(err);
        res.render('userList', {
            title: "user 列表",
            users: users
        });
    });
};
exports.del=function(req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({ _id: id }, function(err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        })
    }
};
exports.login=function(req,res) {
 res.render('login',{});
};
exports.register=function(req,res) {
    res.render('register',{});
};
exports.isLogin=function(req,res,next) {
    if (req.session.user) {
        next();
    } else
        res.redirect('/login');
};
exports.isRole=function(req,res,next) {
    var _role = req.session.user.role;
    if (_role) {
        if (_role > 5)
            next();
        else
            res.redirect('/');
    } else {
        res.redirect('/');
    }
};