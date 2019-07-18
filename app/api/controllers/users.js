const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    create: function(req, res, next) {

        userModel.create({ name: req.body.name, lastname: req.body.lastname, firstname: req.body.firstname, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "User added successfully!!!", data: null});

        });
    },
    getAll: function(req, res, next) {
        let usersList = [];
        userModel.find({}, function(err, users){
            if (err){
                next(err);
            } else{
                for (let user of users) {
                    // usersList.push({email: user.email, password: user.password});
                    usersList.push({ name: user.name, lastname: user.lastname, firstname: user.firstname, email: user.email, password: user.password});

                }
                res.json({status:"success", message: "user list found!!!", data:{users: usersList}});

            }
        });
    },
    getById: function(req, res, next) {
        console.log(req.body);
        userModel.findById(req.params.userId, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "User found!!!", data:{users: userInfo}});
            }
        });
    },
    authenticate: function(req, res, next) {
        userModel.findOne({email:req.body.email}, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                    console.log(userInfo);
                    console.log(token);
                }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    },
}