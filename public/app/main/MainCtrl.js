app.controller('MainCtrl', function($scope, $location, identity, notifier, auth) {
    $scope.identity = identity;
    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/home');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };
});