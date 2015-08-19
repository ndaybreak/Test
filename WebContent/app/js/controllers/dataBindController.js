function dataBindCtrl($scope,$http,$location,$timeout,$window){
	$scope.myName = 'xiaoming';
	
	$scope.$watch('myName',function(newVal,oldVal){
		console.log(newVal);
	});
	$scope.change = function(){
		$scope.myName = 'ned';
	};
	setTimeout(function(){
		$scope.myName = 'ned';
//		alert(1);
	},1000);
	
	$scope.columnFilter = function(){
		console.log(1);
	}
	/*$scope.test = function() {  
        setTimeout(function () {  
            $scope.myName = "good";  
            $scope.$apply();
        }, 2000);  
    };
 
    $scope.test1 = function() {  
         $scope.myName = 'tank';  
    };  
    console.log($scope.myName);
    console.log($scope); 
    $scope.test1();  
    console.log($scope.myName);
    console.log($scope); 
    $scope.test();  
    console.log($scope.myName);
    console.log($scope);*/  
	
	
	
	
	/*$scope.things=[1,2];
	
	$scope.show = function(){
		$scope.myName = 12;
		console.log(1);
	};
	$scope.checkPageNum = function(event){
		if(event.which <= 57 && event.which >= 48)
			return true;
		return false;
	};
	
	
	$scope.$watch('myName',function(val,old){
		//alert(val);
	},true);
	
	$scope.getData = function(){
		var url = BASE_URL + "UserInfoServlet";
		$http
		.get(url)
		.then(function(result)
		{
			console.log(result);
		}, 
		function(error)
		{
			console.log(error);
		});
	};
	
	$scope.data = [{name:'xiao',age:'10'},{name:'xiao',age:'1,000'},
	               {name:'xiao',age:'100'},{name:'xiao',age:'2'},{name:'xiao',age:'3'}];
	$scope.orderByNumber = function(obj){
		console.log(obj.age);
		return parseInt(removeComma(obj.age));
	};
	
	function removeComma (value){
		var re = new RegExp(",", "g");
		if(value){
			return value.replace(re, "");
		}
		return value;
	}*/
}