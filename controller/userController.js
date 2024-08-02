const e = require("express");
const user = require("../model/user");

//메인화면(로그인)
exports.index = (req, res)=>{
    res.render("login");
}

//로그인 로직
exports.post_login = (req, res)=>{
    user.select(req.body.user.id, req.body,user.pw, function (result){
        if (result=null) 
            return res.send({result: result, flag:false})
        else {
            // 비밀번호가 일치하지 않는다면 flag 변수 사용하여 false 반환하여 로그인 실패
            if (req.body.user.pw != result.user.pw) 
                return res.send({result: result, flag: false});
            // 비밀번호가 일치한다면 flag 변수 사용하여 true 반환하여 로그인 성공
            else
                return res.send({result: result, flag: true});
        }
    })  
}

//회원가입 화면 
exports.signUp = (req, res)=>{
    res.render("signUp");
}

//user 정보 저장 (CREATE)
exports.post_user = (req, res)=>{
    console.log(req.body);

    user.insert(req.body, function (result) {
        res.send({id:result});
    })
}

// user 프로필
exports.profile = (req,res)=>{
    res.render("profile");
}

//회원정보 수정 로직 (UPDATE)
exports.patch_user = (req, res)=>{
    user.update(req.body, function (result) {
        console.log("update result: ", result);
        res.send("회원 정보를 업데이트하였습니다.")
    })
}

//회원정보 삭제 (DELETE)
exports.delete_user = (req, res)=>{
    user.delete(req.body.userId, function (result){
        console.log("delete result: ", result);
        res.send("회원 정보를 삭제하였습니다.")
    })
}

//모든 회원 정보 출력 (GET)
exports.list_user = (req, res) => {
    user.getUserList((err, users) => {
        res.render('admin', { users: users });
    });
};

//회원정보 수정 화면
exports.edit = (req, res) => {
    user.get_user(req.body.user_id, function (result) {      
        res.render("edit", {data: result[0]});
    });
}
