/**
 * Created by zhaiyingying on 2016/11/30.
 */
var express=require('express');
var router=express.Router();

router.get('/',function (req,res) {
    res.send('hello,express')
});

module.exports=router;