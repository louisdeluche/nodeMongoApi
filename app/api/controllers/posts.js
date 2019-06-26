const postModel = require('../models/posts');
module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        postModel.findById(req.params.postId, function(err, postInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Post found!!!", data:{posts: postInfo}});
            }
        });
    },
    getAll: function(req, res, next) {
        let postsList = [];
        postModel.find({}, function(err, posts){
            if (err){
                next(err);
            } else{
                for (let post of posts) {
                    postsList.push({id: post._id, name: post.name, image: post.image});
                }
                res.json({status:"success", message: "Posts list found!!!", data:{posts: postsList}});

            }
        });
    },
    updateById: function(req, res, next) {
        postModel.findByIdAndUpdate(req.params.postId,{name:req.body.name}, function(err, postInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Post updated successfully!!!", data:null});
            }
        });
    },
    deleteById: function(req, res, next) {
        postModel.findByIdAndRemove(req.params.postId, function(err, postInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Post deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        postModel.create({ name: req.body.name, image: req.body.image }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Post added successfully!!!", data: null});

        });
    },
}