var categories = require('../models/category');

module.exports = {
    createCategory: function (categoryModel, callback) {
        categories.create(categoryModel, callback);
    },
    findCategory: function (name, callback) {
        categories.findOne({ 'name': name}, function (err, res) {
            callback(err, res);
        });
    },
    update: function(categoryModel, callback){
        categories.findOneAndUpdate({ '_id': categoryModel._id }, categoryModel, callback);
    },
    find: function (query, callback) {
        categories.findOne(query, function(err, res) {
            callback(err, res);
        });
    },
    all: function(query, callback){
        categories.find(query).exec(function(err, categories) {
            if (err) {
                console.log(err);
            } else {
                callback(err, categories);
            }
        });
    },
    deleteCategory: function(id, callback){
        categories.remove({_id : id}, function(err, res){
            if(err){
                console.log(err);
            } else {
                callback(res);
            }
        });
    }
};