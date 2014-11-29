app.controller('CategoryUpdateCtrl', function($scope, $rootScope, $location, $routeParams, notifier, categoriesService) {
    $scope.category = {};
    $scope.getCategory = function(categoryUpdate) {
        categoriesService.findById(categoryUpdate._id).then(function (res) {
            $scope.category = res;
        });
    };
    $scope.update = function(category) {
        categoriesService.update(category).then(function(){
            $rootScope.$broadcast('editedCategory');
            notifier.success('Category successfully updated!');
        }, function(err){
            notifier.error(err);
        });
    };
});