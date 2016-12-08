var data = require('../data');

module.exports = {
    create: function (req, res, callback) {
        var newCategory = req.body;
        data.categories.findCategory({ name: newCategory.name }, function(err, category){
            if (err) {
                console.log(err);
            } else {
                if (!!category) {
                    console.log('Category already in the database');
                    callback(err, category);
                } else {
                    data.categories.createCategory(newCategory, callback);
                    res.send({redirect: '/'});
                }
            }
        })
    },
    deleteCategory: function(req, res, callback){
        data.categories.deleteCategory(req.params.id, function(){
            res.send('Ok');
        });
    },
    update: function(req, res, callback){
        data.categories.update(req.body, function(err, success){
            if(err){
                res.status(400).send('Unable to update the requested category');
            } else {
                res.send(success);
            }
        });
    },
    find: function (req, res, callback) {
        data.categories.find({ name: req.body.name, author: req.identity.currentUser._id }).exec(function(err, category) {
            if (err) {
                console.log(err);
            } else {
                res.send(category);
            }
        })
    },
    findById: function (req, res, callback) {
        data.categories.find({ _id: req.params.id, author: req.user._id }, function(err, category){
            if (err) {
                console.log(err);
            } else {
                res.send(category);
            }
        });
    },
    all:function(req, res) {
        data.categories.all({ author: req.user._id }, function(err, categories) {
            if (err) {
                console.log(err);
            } else {
                res.send(categories);
            }
        })
    }
};
