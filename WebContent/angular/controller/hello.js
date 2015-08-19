var app = angular.module('appModule',[]);
app.controller('HelloController',['$scope',function(aa){
	aa.greeting = {text : 'sss'};
}]);