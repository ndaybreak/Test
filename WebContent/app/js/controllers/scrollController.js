function scrollCtrl($scope) {
	$scope.headers = [];
	for(var i = 0; i < 15; i++){
		$scope.headers.push('AAAAAAAAAAAAAAAA' + i);
	}
	$scope.tableData = [];
	var tempRowData;
	for(var i = 0; i < 5; i++){
		tempRowData = [];
		for(var j = 0; j < 15; j++){
			tempRowData.push(i + '' + j);
		}
		$scope.tableData.push(tempRowData);
	}
};