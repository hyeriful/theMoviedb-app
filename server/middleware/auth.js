const { User } = require('../models/User');

// auth route 만들기
// WHY & WHAT?
// 1. 페이지 이동 때마다 로그인이 되어있는지 안되어 있는지, 관리자 유저인지 등을 체크
// 2, 글을 쓸 때나 지울 때 같은 곳에서 권한이 있는지 체크 등등등


let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;    //이렇게 req에 넣어줌으로써 index,js파일의 auth를 미들웨어로 가진 라우트의 next에서 req.user를 통해 사용자 정보 사용가능
        next();
    });

    // 유저가 있으면 인증 Okay
    // 유저가 없으면 인증 No
}

module.exports = { auth };