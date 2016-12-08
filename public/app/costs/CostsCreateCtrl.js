app.controller('CostsCreateCtrl', function($scope, $rootScope, $filter, notifier, costsService, categoriesService, identity) {
    categoriesService.all().then(function(response){
        $scope.categories = response;
        $scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');
        $scope.createCost = function(cost) {
            cost.user = identity.currentUser._id;
            //cost.creationDate = new Date();
            costsService.create(cost).then(function(){
                $rootScope.$broadcast('addedCost');
                $scope.$$childTail.cost = {};
                $scope.$$childTail.createCostForm.$setPristine();
                notifier.success('Cost successfully created!');
            }, function(err){ notifier.error(err);});
        };
        }, function(error){
        notifier.error(error.message);
    });
});