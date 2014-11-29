var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/categories', auth.isAuthenticated, controllers.categories.all);
    app.get('/api/categories/:id', auth.isAuthenticated, controllers.categories.findById);
    app.post('/api/categories', auth.isAuthenticated, controllers.categories.create);
    app.delete('/api/categories/:id', auth.isAuthenticated, controllers.categories.deleteCategory);
    app.put('/api/categories/:id', auth.isAuthenticated, controllers.categories.update);
    app.get('/api/costs/:id/category', auth.isAuthenticated, controllers.costs.getCostsByCategory);

    app.get('/api/costs', auth.isAuthenticated, controllers.costs.getAllUserCosts);
    app.post('/api/costs', auth.isAuthenticated, controllers.costs.create);
    app.put('/api/costs/:id', auth.isAuthenticated, controllers.costs.update);
    app.get('/api/costs/:id', auth.isAuthenticated, controllers.costs.getById);
    app.delete('/api/costs/:id', auth.isAuthenticated, controllers.costs.deleteCost);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function(req, res){
        res.render('index', {currentUser: req.user});
    });
};