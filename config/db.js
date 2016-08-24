// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '127.0.0.1', 
        user: 'root',
        password: 'wbcz',
        database:'jiudian', // 前面建的users表位于这个数据库中
        port: 3306
    }
};