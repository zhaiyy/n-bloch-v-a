var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

ap.set('view', path.join(__dirname,'view'));
ap.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);