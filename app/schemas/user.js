var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
      unique:false,
      type:String
    },
    role:{
        type:Number,
        default:10
    },
    meta: {
        createAt: {type: Date, default: Date.now()},
        updateAt: {type: Date, default: Date.now()}
    }
});
UserSchema.pre('save', function (next) {
    var user=this;
    if (user.isNew) {
        user.meta.createAt = user.meta.updateAt = Date.now();
    } else {
        user.meta.updateAt = Date.now();
    }
  /*bcrypt.genSalt(SALT_WORK_FACTOB,function(err,salt){
        if(err)return next(err);
        bcrypt.hash(user.password, null, null, function (err, hash){
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        });
    });*/
    bcrypt.hash(user.password, null, null, function (err, hash){
        if (err) {
            return next(err)
        }
        user.password = hash;
        next()
    });
});
UserSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function (id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};
UserSchema.methods= {
    comparePassword: function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err)console.log(err);
             cb(err, isMatch);
        });
    }
};
module.exports=UserSchema;

