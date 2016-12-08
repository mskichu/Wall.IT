app.controller('YearlyStatCtrl', function($scope, costsService, categoriesService) {    
    $scope.loadYearStats = loadYearStats;
    var date = new Date();
    $scope.year = date.getFullYear();
        
    function loadYearStats (){
        $scope.totalSum = Array.apply(null, Array(12)).map(Number.prototype.valueOf,0);
        $scope.budgetSum = 0;
        $scope.categories = [];
        categoriesService.all().then(function(collection){         
            collection.forEach(function(item){
                var category = {};
                category.name = item.name;
                category._id = item._id;
                category.budget = item.budget;
                $scope.budgetSum += Number(item.budget);
                category.months = Array.apply(null, Array(12)).map(Number.prototype.valueOf,0);
                category.monthTotal = 0;
                for (var i = 0; i < 12; i++) {
                    date.setMonth(i);
                    category.from = new Date($scope.year, date.getMonth(), 1);
                    category.to = new Date($scope.year, date.getMonth() + 1, 0);
                    costsService.findByCategory(category).then(function (costs) {
                        if(costs.length > 0){
                            var index = new Date(costs[0].creationDate).getMonth();
                        category.months[index] = costs.reduce(function (total, a) {
                            return Number.parseFloat(total) + Number.parseFloat(a.value);
                        }, 0);
                        category.months[index] = Math.round(category.months[index] * 100) / 100;
                        $scope.totalSum[index] += category.months[index]; 
                        }
                    });
                }
                $scope.categories.push(category);
            });
        });
    };

    loadYearStats();
});