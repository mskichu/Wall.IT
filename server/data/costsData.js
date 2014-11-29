var costs = require('../models/cost');
var categoriesData = require('./categoriesData');
var usersData = require('./usersData');

module.exports = {
    createCost: function (costModel, callback) {
        categoriesData.findCategory(costModel.category, function (err, res) {
            costModel.category = res;
            usersData.findById(costModel.user, function (err, user) {
                costModel.user = user._id;
                costModel.creationDate = new Date();
                if(costModel.value <= 0){
                    var err = new Error();
                    err.message = 'The value should be grater than zero!';
                    callback(err, null);
                } else {
                    costs.create(costModel, callback);
                }
            });
        });
    },
    findCost: function(id, callback){
        costs.findOne({ '_id': id}).exec(callback);
    },
    deleteCost: function(id, callback){
        costs.find({ '_id': id }).remove(callback);
    },
    update: function(costModel, callback){
        if(costModel.value <= 0){
            var err = new Error();
            err.message = 'The value should be greater than zero!';
            callback(err, null);
        } else {
            costs.findOneAndUpdate({ '_id': costModel._id }, costModel, callback);
        }
    },
    getCosts: function (query, options, callback) {
        costs.find(query).populate('category').exec(function (err, res) {
            if (options) {
                var filtered = [];
                for(var i = 0; i < res.length; i++){
                    if(Date.parse(res[i].creationDate.toUTCString()) >= options.from && Date.parse(res[i].creationDate.toLocaleDateString()) <= options.to){
                        filtered.push(res[i]);
                    }
                }
                var sorted = filtered.sort(function (x, y) {
                    if (options.sortMethod == 'asc') {
                        return x[options.sortBy] > y[options.sortBy] ? 1 : x[options.sortBy] < y[options.sortBy] ? -1 : 0;
                    } else if (options.sortMethod == 'desc') {
                        return x[options.sortBy] > y[options.sortBy] ? -1 : x[options.sortBy] < y[options.sortBy] ? 1 : 0;
                    }
                });
                var paginated = sorted.slice(options.page * options.size, options.size + options.page * options.size);
                if (callback) {
                    callback(err, paginated);
                }
            } else {
                callback(err, res);
            }
        });
    },
    getAllCosts: function (query, options, callback) {
        costs.find(query).populate('category').exec(function (err, res) {
            if (options) {
                var filtered = [];
                for(var i = 0; i < res.length; i++){
                    if(Date.parse(res[i].creationDate.toUTCString()) >= options.from && Date.parse(res[i].creationDate.toLocaleDateString()) <= options.to){
                        filtered.push(res[i]);
                    }
                }
                var sorted = filtered.sort(function (x, y) {
                    if (options.sortMethod == 'asc') {
                        return x[options.sortBy] > y[options.sortBy] ? 1 : x[options.sortBy] < y[options.sortBy] ? -1 : 0;
                    } else if (options.sortMethod == 'desc') {
                        return x[options.sortBy] > y[options.sortBy] ? -1 : x[options.sortBy] < y[options.sortBy] ? 1 : 0;
                    }
                });
                if (callback) {
                    callback(err, sorted);
                }
            } else {
                callback(err, res);
            }
        });
    }
};