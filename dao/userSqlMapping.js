// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO users(id, user, pwd) VALUES(0,?,?)',
    update:'update users set user=?, pwd=? where id=?',
    delete: 'delete from users where id=?',
    queryById: 'select * from users where id=?',
    queryAll: 'select * from users'
};
 
module.exports = user;