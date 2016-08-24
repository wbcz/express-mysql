// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/db');
//var $util = require('../util/util');
var $sql = require('./userSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
 
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            console.log(param)
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.user, param.pwd], function(err, result) {
                console.log(result);
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }
 
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
 
                // 释放连接 
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, ret) {
                jsonWrite(res, ret);
                connection.release();
            });
        })
    },
    update: function(req, res, next) {
        var param = req.body;
        console.log(param)
        if(param.name == null || param.age == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.user, param.pwd,+param.id], function(err, ret) {
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    });
                } else {
                    res.render('fail',  {
                        result: result
                    });
                };

                connection.release();
            });
        })
    }
};