/**
 * Created by zhaiyingying on 2016/12/7.
 */
var path = require('path');
var assert = require('assert');
var request = require('supertest');
var app = require('../index');
var User = require('../lib/mongo').User;

describe('signup', function() {
    describe('POST /signup', function() {
        var agent = request.agent(app);//persist cookie when redirect
        beforeEach(function (done) {
            // 创建一个用户
            User.create({
                name: 'aaa',
                password: '123456',
                avatar: '',
                gender: 'x',
                bio: ''
            })
                .exec()
                .then(function () {
                    done();
                })
                .catch(done);
        });

        afterEach(function (done) {
            // 清空 users 表
            User.remove({})
                .exec()
                .then(function () {
                    done();
                })
                .catch(done);
        });

        // 名户名错误的情况
        it('wrong name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: '' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/名字请限制在 1-10 个字符/));
                    done();
                });
        });
    // 性别错误的情况
        it('wrong genber', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'a'})
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/性别只能是 m、f 或 x/));
                    done();
                });
        });
        // 简介错误的情况
        it('wrong bio', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'm', bio: '"myblog=s%3AUyinlrLJJbmCFcvUEaNx-0_nLw-eBdjD.Qwm8nhfPs3eQFBv2osxn5ZuYtIjB2tXlWGVELYdM6zUnoder' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/个人简介请限制在 1-30 个字符/));
                    done();
                });
        });

        // 简介错误的情况
        it('wrong bio', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'm', bio: ''})
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/个人简介请限制在 1-30 个字符/));
                    done();
                });
        });
        // 密码错误的情况
        it('wrong password', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'm', bio: 'noder', password: '1234', repassword: '1234' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/密码至少 6 个字符/));
                    done();
                });
        });
        // 密码错误的情况
        it('wrong password', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'm', bio: 'noder', password: '1234', repassword: '1234' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/密码至少 6 个字符/));
                    done();
                });
        });
        // 确认密码错误的情况
        it('wrong repassword', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa11', gender: 'm', bio: 'noder', password: '123456', repassword: '1234' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/两次输入密码不一致/));
                    done();
                });
        });
        // 其余的参数测试自行补充
        // 用户名被占用的情况
        it('duplicate name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'aaa', gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/用户名已被占用/));
                    done();
                });
        });

        // 注册成功的情况
        it('success', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: 'nswbmw', gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/注册成功/));
                    done();
                });
        });
    });
});