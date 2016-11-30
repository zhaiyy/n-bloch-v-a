/**
 * Created by zhaiyingying on 2016/11/30.
 */
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.get('/',indexRouter)
app.get('/users',userRouter)

app.listen(3000);

