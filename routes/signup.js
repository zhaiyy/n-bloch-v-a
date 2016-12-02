/**
 * Created by zhaiyingying on 2016/11/30.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middleware/check').checkNotLogin;

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signup')
});

router.post('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});


module.exports=router;