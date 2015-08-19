var app = angular.module('myApp', [ 'ngRoute','ui.bootstrap' ]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			//templateUrl : 'html/index.html',
			templateUrl : 'html/mainPage.jsp',
			controller : menuCtrl})
		.when('/phones', {
			templateUrl : 'html/phone-list.html',
			controller : PhoneListCtrl})
		.when('/phones/:phoneId', {
			templateUrl : 'html/phone-detail.html',
			controller : PhoneDetailCtrl})
		.when('/dataBindTest', {
				templateUrl : 'html/dataBindTest.html',
				controller : dataBindCtrl})
		.when('/directiveTest', {
			templateUrl : 'html/directiveTest.html',
			controller : directiveCtrl})
		.when('/datePickerTest', {
				templateUrl : 'html/datePickerTest.html',
				controller : DatepickerDemoCtrl})
		.when('/tabsTest', {
			templateUrl : 'html/tabsTest.html',
			controller : tabsTestCtrl})
		.when('/tabContent', {
			templateUrl : 'html/tabContent.html',
			controller : tabContentCtrl})
		.when('/scroll', {
			templateUrl : 'html/scroll.html',
			controller : scrollCtrl})
//		.when('/fileUpload', {
//			templateUrl : 'html/fileUpload.html',
//			controller : fileUploadCtrl})
		.otherwise({
			redirectTo : '/'
		});
} ]);

app.filter('checkFlag', function() {
	return function(input, startIndex, endIndex) {
		return input ? input.slice(2, 5) : [];
	};
});


app.directive("hello",function(){
	return{
		restrict:'E',
		template:'<h1>Hello Ned</h1>',    
		replace:true
	}
});

app.directive("hello1",function(){
	return{
			restrict:'E',
			template:'<div>Hi there <span></span></div>',    
			trunsclude:false,
			replace:false,
			scope:{},// add attribute scope, directive will has own scope which extend parent scope
			compile:function(){},//$compile 函数处理时调用指令的compile函数来改变dom结构
			link:function(scope,element,attrs){//将模板的scope与模板关联
				console.log('scope1');
				console.log(scope);
			}
	}
});
/*
 * 如果在 directive 中直接返回一个函数，则这个函数会作为 compile 的返回值，也即是作为 link 函数使用
 * 这里说的 compile 和 link 都是一个指令的组成部分，一个完整的定义应该返回一个对象，这个对象包括了多个属性：
name
priority
terminal
scope
controller
require
restrict
template
templateUrl
replace
transclude
compile
link
 * */
app.directive("hello2",function(){
	return function(scope){
		console.log('scope2');
		console.log(scope);
	}
});

app.directive("expander",function(){
	return {
		restrict:"EA",
		replace:true,  //
		transclude:true,
		scope:{
			name:'=expandTitle'
		},
		templateUrl:'template/expander.html',
		link:function(scope,element,attrs){
			scope.showMe = false;
			scope.toggle = function(){
				scope.showMe = !scope.showMe;
			}
			
			scope.$watch('name',function(val,old){
				console.log('old+val');
				console.log(old + '__' + val);
			});
		}
	}
});
