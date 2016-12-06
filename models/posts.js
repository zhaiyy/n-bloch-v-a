/**
 * Created by zhaiyingying on 2016/12/2.
 */
var Post=require('../lib/mongo').Post;

module.exports = {
    create:function (post) {
        return Post.create(post).exec();
    }
}