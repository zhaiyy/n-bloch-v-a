/**
 * Created by zhaiyingying on 2016/11/30.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middleware/check').checkLogin;

router.get('/',checkLogin,function (req,res,next) {
    res.send(req.flash());
});


module.exports=router;