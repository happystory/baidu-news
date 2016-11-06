var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('config-lite');

var pool = mysql.createPool({
    host: config.host,
    user: config.user, 
    password: config.password, 
    database: config.database
});

/* 首页 */
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * from news where classify="tuijian"',function(err, rows, fields) {
            if (err) {
                throw err;
            }
            res.render('index', {
                title: '百度新闻',
                rows: rows
            });
        });
        connection.release();
    });
});

/* 详情页 */
router.get('/news/:id', function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * from news where id=' + req.params.id, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            res.render('detail', {
                title: rows[0].title,
                row: rows[0]
            });
        });
        connection.release();
    });
});


router.post('/select', function(req, res) {
    var classify = req.body.classify;
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * from news where classify="' + classify +'"', function(err, rows, fields) {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        connection.release();
    });
});

module.exports = router;
