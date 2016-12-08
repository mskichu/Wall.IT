var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider) {

    toastr.options.positionClass = "toast-top-right";
    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/login',
            controller: 'MainCtrl'
        })
        .when('/home', {
            templateUrl: '/partials/main/home',
            controller: 'HomeCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/categories/create', {
            templateUrl: '/partials/categories/category-create',
            controller: 'CategoriesCreateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/categories/list', {
            templateUrl: '/partials/categories/categories-list',
            controller: 'CategoriesListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/categories/update/:id', {
            templateUrl: '/partials/categories/category-update',
            controller: 'CategoryUpdateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/categories/delete/:id', {
            templateUrl: '/partials/categories/category-list',
            controller: 'CategoriesListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/costs/create', {
            templateUrl: '/partials/costs/cost-create',
            controller: 'CostsCreateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/costs/budget', {
            templateUrl: '/aprtials/costs/budget',
            controller: 'BudgetCtrl',
            resolve: routeUserChecks.authenticated 
        })
        .when('/costs/list', {
            templateUrl: '/partials/costs/costs-list',
            controller: 'CostsListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/costs/delete/:id', {
            templateUrl: '/partials/costs/costs-list',
            controller: 'CostsListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/costs/update/:id', {
            templateUrl: '/partials/costs/cost-update',
            controller: 'CostUpdateCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/costsstat/', {
            templateUrl: '/partials/stat/cost-stat',
            controller: 'CostStatCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/categoriesstat/', {
            templateUrl: '/partials/stat/categories-stat',
            controller: 'CategoriesStatCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/yearlystat/', {
            templateUrl: '/partials/stat/yearly-stat',
            controller: 'YearlyStatCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});