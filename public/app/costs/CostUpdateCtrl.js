app.controller('CostUpdateCtrl', function($scope, $rootScope, notifier, costsService, categoriesService) {
    categoriesService.all().then(function(response){
        $scope.categories = response;
    });

    $scope.cost = {};
    $scope.getCost = function(costUpdate){
        costsService.findById(costUpdate._id).then(function(res){
            $scope.cost = res;
        });
    };

    $scope.update = function(cost) {
        costsService.update(cost).then(function(){
                $rootScope.$broadcast('editedCost');
                notifier.success('Cost successfully updated!');
            }, function(err){
                notifier.error(err);
            }
        )
    };
});