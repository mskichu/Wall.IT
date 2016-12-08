app.controller('CostStatCtrl', function($scope, costsService, categoriesService) {
    $scope.loadCosts = function(){
        costsService.all($scope.filter).then(function (costs) {
            $scope.costs = costs;
            var total = costs.reduce(function (total, a) {
                return Number.parseFloat(total) + Number.parseFloat(a.value);
            }, 0);
            $scope.sum = total.toFixed(2);
            console.log(total);
        });
    };

    categoriesService.all().then(function(categories){
        $scope.categories = categories;
    });

    $scope.filter = {};
    var date = new Date();
    $scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    $scope.loadCosts();
});