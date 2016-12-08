app.controller('BudgetCtrl', function($scope, costsService, categoriesService) {
    var date = new Date();
    $scope.year = date.getFullYear();
    $scope.loadCategories = function(){
        $scope.budget = {};
        $scope.budget.categories = [];
        categoriesService.all().then(function(collection){
            collection.forEach(function(item){
                var category = {};
                category.name = item.name;
                category._id = item._id;
                category.budget = item.budget;
                $scope.budget.categories.push(category);
            });
        });
    };
    $scope.setBudget = function () {
        $scope.budget.categories.forEach(function(category){
            categoriesService.update(category).then(function(){
                // $rootScope.$broadcast('editedCategory');
            }, function(err){
                notifier.error(err);
            });
        });
    }

    $scope.loadCategories();
});