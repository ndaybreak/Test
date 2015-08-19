function tabsTestCtrl($scope,$http){
	 $(document).ready(function() {
         enableSelectBoxes();
     });

     function enableSelectBoxes(){
         $('div.selectBox').each(function(){
             $(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
				$(this).attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
				
				//for display none or block
				$(this).children('span.selected,span.selectArrow').click(function(){
					if($(this).parent().children('div.selectOptions').css('display') == 'none'){
						$(this).parent().children('div.selectOptions').css('display','block');
					}
					else
					{
						$(this).parent().children('div.selectOptions').css('display','none');
					}
				});
				
				$(this).find('span.selectOption').click(function(){
					$(this).parent().css('display','none');
					$(this).closest('div.selectBox').attr('value',$(this).attr('value'));
					$(this).parent().siblings('span.selected').html($(this).html());
				});
         });
     }

     /* click elsewhere to hide selection */
     $(document).mouseup(function (e)
     {
         var container = $(".selectOptions");

         if (!container.is(e.target) // if the target of the click isn't the container...
             && container.has(e.target).length === 0) // ... nor a descendant of the container
         {
             container.hide();
         }
     });

     /* jquery tab */
     //$("#tabs").tabs();

     $(function() {
         $( "#tabs" ).tabs({
             beforeLoad: function( event, ui ) {
            	 ui.jqXHR.statusText = 'canceled';
                 ui.jqXHR.error(function() {
                     ui.panel.html(
                         "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                         "If this wouldn't be a demo." );
                 });
                 ui.jqXHR.success(function(result) {
                     var html = '';
                     for(var i = 0; i < 30; i++){
                    	 html += '<input type="checkBox"><span class="selectOption" style="display:block">'+i+'</span>';
                     }
                     ui.panel.html(html + result);
                 });
                 ui.jqXHR.complete(function(result) {
                 });
             },
             activate: function( event, ui ) {
            	 console.log('activate');
             },
             beforeActivate: function( event, ui ) {
            	 console.log('beforeActivate');
             },
             create: function( event, ui ) {
            	 console.log('create');
             }
             //,load: function( event, ui ) {
             //}
             //,show: { effect: "blind", duration: 800 }
             //,active: 1
         });
         var isDisabled = $( "#tabs" ).tabs( "option", "disabled" );
         console.log(isDisabled);
         
         $( "#tabs" ).on( "tabsload", function( event, ui ) {
        	 console.log('tabsload');
         } );
     });
     
     
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
}