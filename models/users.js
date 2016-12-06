/**
 * Created by zhaiyingying on 2016/12/2.
 */
var User=require('../lib/mongo').User;

module.exports = {
    create:function (user) {
        return User.create(user).exec();
    },
    getUserByName:function (name) {
        return User.findOne({name:name})
            .addCreatedAt()
            .exec()
    }
}