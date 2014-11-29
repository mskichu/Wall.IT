app.controller('CategoriesListCtrl', function($scope, $location, categoriesService, notifier) {
    var initCategories = function() {
        categoriesService.all().then(function (categories) {
            $scope.categories = categories;
        });
    };

    initCategories();
    $scope.$on('addedCategory', initCategories);
    $scope.$on('editedCategory', initCategories);
    $scope.remove = function(categories){
        categoriesService.remove(categories._id).then(function(success){
            initCategories();
            notifier.success('Category successfully removed!');
        }, function(err){
            initCategories();
            notifier.error(err);
        });
    };
});