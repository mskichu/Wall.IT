'use strict';

app.factory('categoriesService', ['$http', '$q', function($http, $q) {
    var categoriesUri = 'api/categories';
    return {
        all: function(){
            var deferred = $q.defer();
            $http({method: 'GET',
                url: categoriesUri
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        findById: function(id){
            var deferred = $q.defer();
            $http({method: 'GET',
                url: categoriesUri + '/' + id
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        remove: function (id) {
            var deferred = $q.defer();
            $http({method: 'DELETE',
                url: categoriesUri +'/' + id
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        update: function(category){
            var deferred = $q.defer();
            $http({method: 'PUT',
                url: categoriesUri +'/' + category._id,
                data: category
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        create: function(category){
            var deferred = $q.defer();
            $http({method: 'POST',
                url: categoriesUri + '/',
                data: category
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}]);