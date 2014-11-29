app.controller('CostsListCtrl', function($scope, costsService, categoriesService, notifier) {
    $scope.init = function () {
        if($scope.filter.page <= 0){
            $scope.filter.page = 1;
        }
        costsService.all($scope.filter).then(function (costs) {
            $scope.costs = costs;
        });
    };

    categoriesService.all().then(function(categories){
        $scope.categories = categories;
    });

    $scope.filter = {};
    var date = new Date();
    $scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.filter.page = 1;
    $scope.init();

    $scope.$on('addedCost', $scope.init);
    $scope.$on('editedCost', $scope.init);
    $scope.remove = function(cost){
        costsService.remove(cost._id).then(function(){
            $scope.init();
            notifier.success('Cost successfully removed!');
        }, function(err){
            $scope.init();
            notifier.error(err);
        });
    };
});