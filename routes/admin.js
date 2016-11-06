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

/* 后台管理页 */
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * from news where classify="tuijian"', function(err, rows, fields) {
            if (err) {
                throw err;
            }
            res.render('admin', {
                title: '后台管理系统',
                rows: rows
            });
            connection.release();
        });
    });
});

/* 后台增加页 */
router.get('/create', function(req, res) {
    res.render('create', {
        title: '新建新闻',
        row: {
            title: '',
            img: '',
            content: '',
            time: '',
            classify: 'tuijian'
        }
    });
});

router.get('/update/:id', function(req, res) {
    var id = req.params.id;
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * from news where id=' + id, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            res.render('update', {
                title: '修改新闻',
                row: rows[0]
            });
        });
        connection.release();
    });
});

router.post('/update/:id', function(req, res) {
    if (req.body.title.trim() &&
        req.body.img.trim() &&
        req.body.content.trim() &&
        req.body.time.trim() &&
        req.body.classify.trim()) {
        pool.getConnection(function(err, connection) {
            connection.query('update news set ? where id = ?', [{
                title: req.body.title,
                img: req.body.img,
                content: req.body.content,
                time: req.body.time,
                classify: req.body.classify
            }, req.params.id], function(err, fields) {
                if (err) {
                    throw err;
                }
                console.log('Update success.');
            });
            connection.release();
            res.redirect('/admin');
        });
    } else {
        console.log('Update failed');
        res.json({status_code:0});
    }
});

router.post('/new', function(req, res) {
    if (req.body.title.trim() &&
        req.body.img.trim() &&
        req.body.content.trim() &&
        req.body.time.trim() &&
        req.body.classify.trim()) {
        pool.getConnection(function(err, connection) {
            connection.query('insert into news set ?', {
                title: req.body.title,
                img: req.body.img,
                content: req.body.content,
                time: req.body.time,
                classify: req.body.classify
            }, function(err, fields) {
                if (err) {
                    throw err;
                }
                console.log('Insert success.');
            });
            connection.release();
            res.redirect('/admin');
        });
    } else {
        console.log('Insert failed');
        res.json({status_code:0});
    }
});

router.delete('/delete', function(req, res) {
    var id = req.query.id;
    if (id) {
        pool.getConnection(function(err, connection) {
            connection.query('delete from news where id=' + id, function(err, fields) {
                if (err) {
                    throw err;
                }
                console.log('Delete success.');
                res.json({ success: 1 });
            });
            connection.release();
        });
    }
});

module.exports = router;
