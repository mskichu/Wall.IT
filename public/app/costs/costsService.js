'use strict';

app.factory('costsService', ['$http', '$q', function($http, $q) {
    var costsUri = 'api/costs';
    return {
        remove: function (id) {
            var deferred = $q.defer();
            $http({method: 'DELETE',
                url: costsUri +'/' + id
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        all: function (options) {
            var deferred = $q.defer();
            var url = costsUri;
            if(options){
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                options.from = options.from || firstDay;
                options.to = options.to || lastDay;
                url += '?from=' + options.from;
                url += '&to=' + options.to;
                if(options.category)
                {
                    url += '&category=' + options.category;
                }
            }
            $http({ method: 'GET', url: url})
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
        },
        findByCategory: function(options){
            var deferred = $q.defer();
            var url = costsUri + '/' + options._id + '/category';
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            options.from = options.from || firstDay;
            options.to = options.to || lastDay;
            url += '?from=' + options.from;
            url += '&to=' + options.to;
            url += '&category=' + options._id;
            $http({ method: 'GET', url: url})
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        update: function(cost){
            var deferred = $q.defer();
            $http({method: 'PUT',
                url: costsUri +'/' + cost._id,
                data: cost
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        create: function(cost){
            var deferred = $q.defer();
            $http({method: 'POST',
                url: costsUri + '/',
                data: cost
            })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        findById: function(id) {
            var deferred = $q.defer();
            $http({method: 'GET',
                url: costsUri + '/' + id
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