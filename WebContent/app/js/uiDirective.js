/**
 *
 */
app.directive('paScroll',function($window){
	return function(scope, element, attrs){
		element.wrap('<div class="scroll-container" />');
		element.wrap('<div class="pa-scroll-target" style="overflow-x: hidden;border:1px solid red" />');
		element.parent().after('<div class="pa_scroll-div" style="overflow-x:auto;position: fixed;bottom: 0px;border:1px solid red">'+
									'<div style="height:10px"></div>'+
								'</div>');
		var scrollObj,targetWidth;
		var listener = setInterval(function() {
			scrollObj = element.parent().next('.pa_scroll-div');
			scrollObj.width(element.parent().width());
			scrollObj.find('div').width(element.width());
	     }, 1000);
		//when you go to a new link it stops listening
		element.on('remove', function() {
			clearInterval(listener);
		});
		$('.pa_scroll-div').on('scroll',function(){
			$('.pa-scroll-target').scrollLeft($(this).scrollLeft());
		});
	};
});