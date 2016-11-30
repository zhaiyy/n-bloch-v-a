/**
 * Created by zhaiyingying on 2016/11/30.
 */
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
    res.send('hello, ' + req.params.name);
});


module.exports = router;
