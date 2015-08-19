function PhoneListCtrl($scope, $http) {
	/* $http.get('phones/phones.json').success(function(data) {
	   $scope.phones = data;
	 });*/
	var data = [ {
		"age" : 13,
		"id" : "motorola",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "111111111111111111111",
		"flag":true
	}, {
		"age" : 14,
		"id" : "bbbbbbbb",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "222222222222222222",
		"flag":true
	}, {
		"age" : 12,
		"id" : "ddddddddddd",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "33333333333333",
		"flag":false
	}, {
		"age" : 11,
		"id" : "sssssssss",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "444444444444444444",
		"flag":true
	}, {
		"age" : 10,
		"id" : "motorola-defy-with-motoblur",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "5555555555555555555555555555555",
		"flag":false
	}, {
		"age" : 15,
		"id" : "rrrrrr",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "666666666",
		"flag":true
	}, {
		"age" : 16,
		"id" : "tttttttttttttt",
		"name" : "Motorola DEFY\u2122 with MOTOBLUR\u2122",
		"snippet" : "7777777777777777777777",
		"flag":false
	} ];
	$scope.phones = data;
	$scope.orderProp = 'age';
}

function PhoneDetailCtrl($scope, $routeParams) {
	$scope.phoneId = $routeParams.phoneId;
}