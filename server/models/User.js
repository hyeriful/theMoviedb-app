const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  //salt가 몇 글자인지
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});


//User 모델에 정보를 save하기 전에 실행
userSchema.pre('save', function( next ){
    var user = this;

    //비밀번호를 바꿀때만 비밀번호를 암호화해준다
    if(user.isModified('password')){ 
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt){ //salt생성 -> salt를 이용해서 비밀번호를 암호화
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){   //hash: 암호화된 비밀번호
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword 1234567, 암호화된 비밀번호 $2b$10$EAYeI2ysE4LV8E8zfRcpiOX
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb){
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');    //뒤에 string은 아무거나
    // user._id + 'secreToken' -> token
    //나중에 token을 해석할 때 'secreToken'을 넣으면 user._id가 나온다(그래서 token을 가지고 user가 누군지를 알 수 있음)

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    });
};

userSchema.statics.findByToken = function( token, cb ){
    var user = this;

    // 토큰을 decode 한다
    jwt.verify(token, 'secretToken', function(err, decoded){    //decoded는 decode된 결과
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 데이터베이스에 보관된 token이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){

            if(err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };