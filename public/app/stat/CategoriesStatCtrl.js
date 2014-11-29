app.controller('CategoriesStatCtrl', function($scope, costsService, categoriesService) {
    $scope.loadCategories = function(){
        $scope.totalSum = 0;
        var categories = [];
        categoriesService.all().then(function(collection){
            collection.forEach(function(item){
                var category = {};
                category.name = item.name;
                category._id = item._id;
                category.from = $scope.filter.from;
                category.to = $scope.filter.to;
                costsService.findByCategory(category).then(function (costs) {
                    category.total = costs.reduce(function (total, a) {
                        return Number.parseFloat(total) + Number.parseFloat(a.value);
                    }, 0);
                    categories.push(category);
                    $scope.categories = categories;
                    $scope.totalSum += category.total;
                });
            });
        });
    };

    var date = new Date();
    $scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.loadCategories();
});