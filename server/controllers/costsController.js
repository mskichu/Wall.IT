var data = require('../data');
var defaultPageSize = 10;

module.exports = {
    // POST /api/costs - create new cost
    create: function(req, res, next){
        data.costs.createCost(req.body, function(err, cost){
            if(err){
                res.status(400).send('Unable to create the requested cost');
            } else {
                res.send(cost);
            }
        });
    },
    update: function(req, res, next){
        data.costs.update(req.body, function(err, cost){
            if(err){
                res.status(400).send('Unable to update the requested cost');
            } else {
                res.send(cost);
            }
        });
    },
    deleteCost: function(req, res, next){
        data.costs.deleteCost(req.params.id, function(err, cost){
            if(err){
                res.status(400).send('Unable to delete the requested cost');
            } else {
                res.send(cost);
            }
        });
    },
   getAllUserCosts: function(req, res, next) {
       var options = {};
        options.size = req.query.size || defaultPageSize;
        options.page = parseInt(req.query.page) - 1;
        options.sortBy = req.query.orderBy || 'creationDate';
        options.sortMethod = req.query.orderType || 'asc';
        options.from = Date.parse(req.query.from);
        options.to = Date.parse(req.query.to);

       var query = { user: req.user._id };
       if(req.query.category){
            query.category = req.query.category;
       }

       data.costs.getCosts(query, options, function(err, collection) {
                if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    },
    getCostsByCategory: function(req, res, next){
        var options = {};
        options.from = Date.parse(req.query.from);
        options.to = Date.parse(req.query.to);
        var query = { user: req.user._id, category: req.query.category };
        data.costs.getAllCosts(query, options, function(err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    },
    getById: function(req, res, next) {
        data.costs.findCost(req.params.id, function(err, cost) {
            if (err) {
                res.status(404).send('Cost could not be found.');
            } else {
                res.send(cost);
            }
        });
    }
};