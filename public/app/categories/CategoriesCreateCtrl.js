app.controller('CategoriesCreateCtrl', function($scope, $rootScope, $location, notifier, categoriesService, identity) {
    $scope.createCategory = function (category) {
        category.author = identity.currentUser._id;
        categoriesService.create(category).then(function () {
            $rootScope.$broadcast('addedCategory');
            $scope.$$childTail.category = {};
            $scope.$$childTail.createCategoryForm.$setPristine();
            notifier.success('Category successfully created!');
        }, function (error) {
            notifier.error(error.message);
        });
    };
});