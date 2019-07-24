const articleModel = require('../models/articles');
const userModel = require('../models/users');
module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        articleModel.findById(req.params.articleId, function(err, articleInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Article found!!!", data:{articles: articleInfo}});
            }
        });
    },
    getAll: function(req, res, next) {
        let articlesList = [];
        articleModel.find({}, function(err, articles){
            if (err){
                next(err);
            } else{
                for (let article of articles) {


                    function operation(callback){ userModel.findById(article.user_id, function(err, userInfo){
                        if (err) {
                            console.log(err);
                            next(err);
                        } else {
                            console.log(userInfo);
                            if (userInfo != null){
                                let autor = userInfo.name;
                                callback(autor);
                            }

                        }
                    })
                }

                    operation(function(autor){
                        articlesList.push({id: article._id, title: article.title, content: article.content, autor: autor});
                    });



                }
                operation(function(autor){

                res.json({articles: articlesList});
                });


            }
        });
    },
    updateById: function(req, res, next) {
        articleModel.findByIdAndUpdate(req.params.articleId,{title:req.body.title}, function(err, articleInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Article updated successfully!!!", data:null});
            }
        });
    },
    deleteById: function(req, res, next) {
        articleModel.findByIdAndRemove(req.params.articleId, function(err, articleInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Article deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        console.log(req.body);
        console.log(res.body);
        console.log(req.body.user_id);
        articleModel.create({ title: req.body.title, content: req.body.content, user_id: req.body.user_id, }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Article added successfully!!!", data: null});

        });
    },
}