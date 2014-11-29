var usersController = require('../controllers/usersController');
var costsController = require('../controllers/costsController');
var categoriesController = require('../controllers/categoriesController');

module.exports = {
    users: usersController,
    costs: costsController,
    categories: categoriesController
}