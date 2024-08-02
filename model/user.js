const mysql = require('mysql2');
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'colde7300!',
    database: 'plabfootball',
    port:3306
})

db.connect((err)=>{
    if (err) console.log(err)
    console.log('DB Connected')
})

//회원가입
// exports.insert = (data, cb) => {
//     let sql = `INSERT INTO user (user_id, user_pw, user_name, user_gender) VALUES (?, ?, ?, ?)`;

//     db.query(sql, [data.user_id, data.user_pw, data.user_name, data.user_gender], (err, rows) => {
//         if (err) throw err;
//         cb(data.user_id);  
//     });
// }
exports.insert = (data) =>{
    return new Promise((resolve, reject)=>{
        let sql = `INSERT INTO user (user_id, user_pw, user_name, user_gender) VALUES (?, ?, ?, ?)`;

        db.query(sql, [data.user_id, data.user_pw, data.user_name, data.user_gender], (err, rows) => {
             if (err) 
                return reject(err);
             resolve(data.user_id);  
        })
    })        
}

//로그인 정보 읽기
exports.select = (id, password, cb) => {
    let sql = `SELECT * FROM user WHERE user_id = ? limit 1`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        cb(rows[0]);
    });
}

//회원 정보
exports.get_user = (id, cb) => {
    let sql = `SELECT * FROM user WHERE user_id= ? limit 1`;
    db.query(sql, [id], (err, rows)=> {
        if (err) throw err;
        cb(rows);
        console.log("id : " + id);
    });
}

//모든 회원 리스트
exports.getUserList = (cb) => {
    const sql = `SELECT user_id, user_name, user_gender FROM user`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};

//회원 정보 수정
exports.update = (data, cb) => {
    let sql = `UPDATE user SET user_pw = ?, user_name = ?, user_phone = ? WHERE user_id = ?`;
    
    db.query(sql, [data.user_pw, data.user_name, data.user_phone], (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}
    
//회원 탈퇴
exports.delete = (id, cb) => {
    let sql = `DELETE FROM user WHERE user_id = ?`;
  
    db.query(sql, [id], (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}

