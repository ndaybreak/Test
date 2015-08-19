function fileUploadCtrl($scope,$http,$location){
	$scope.myName = 'xiaoming';
	
	console.log($scope);
	console.log($http);
	console.log($location);
	
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