const articleModel = require('../models/articles');
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
                    articlesList.push({id: article._id, title: article.title, content: article.content, image: article.image});
                }
                // res.json({status:"success", message: "Articles list found!!!", data:{articles: articlesList}});
                res.json({articles: articlesList});

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
        articleModel.create({ title: req.body.title, content: req.body.content, user_id: req.body.user_id, image: req.body.image }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Article added successfully!!!", data: null});

        });
    },
}