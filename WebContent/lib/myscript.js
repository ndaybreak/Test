// JavaScript Document

(function($) {

var myMessages = ['info','warning','error','success'];
function hideAllMessages()
{
	var messagesHeights = new Array(); // this array will store height for each
	for (i=0; i<myMessages.length; i++) {
		messagesHeights[i] = $('.' +myMessages[i]).outerHeight(); // fill array
		$('.' + myMessages[i]).css('top',-messagesHeights[i]); //move element outside viewport	  
	}
}
function showMessage(type) {
	$('.'+ type +'-trigger').click(function(){
		hideAllMessages();				  
		$('.'+type).animate({top:"0"}, 500);
	});
}
$(document).ready(function() {
	// Initially, hide them all
	hideAllMessages();
	// Show message
	for(var i=0;i<myMessages.length;i++) {
		showMessage(myMessages[i]);
	}
	// When message is clicked, hide it
	$('.message').click(function() {			  
		$(this).animate({top: -$(this).outerHeight()}, 500);
	});
	
	currentPage=1;	
	showPageNation(95,10); //for example:totalResults is 95, each page show 10 results
	
	//toggle control
	$(".toggle").each(function(index, toggle) {
       	 toggleHandler(toggle);
   	});
		
	// source div
	$("div.viewText").css("cursor", "pointer").live("click",function(event){
		if($(this).hasClass("showSource")){
			$(this).removeClass("showSource");
			$(this).parent().find("div:gt(0)").hide();
			$(this).find("i").eq(0).removeClass("expandSource").addClass("collspandSource");
		}else{
			$(this).addClass("showSource");
			$(this).parent().find(":gt(0)").show();
			$(this).find("i").eq(0).removeClass("collspandSource").addClass("expandSource");
		}
	});
	if($( "div.tabs" ).length>0){
		$( "div.tabs" ).tabs();
	}
	
});
function pageChange(pageValue){
	
	if(pageValue=="First"){
		currentPage=1;
	}
	else if (pageValue=="Last") {currentPage=totalPage;}
	else if (pageValue=="Previous") {currentPage=currentPage-1;}
	else if (pageValue=="Next") {currentPage=currentPage+1;}
	else{
		currentPage=parseInt(pageValue);
	}
	showPageNation(95,10);	//for example:totalResults is 95, each page show 10 results
}	

function showPageNation(totalResults,showLength){
	totalPage=Math.ceil(totalResults/showLength);
	if(totalPage<5){
		for(var i=5; i>totalPage; i--){
			$(".pageNationDiv").eq(0).find("[name="+i+"]").remove();
		}		
	}
	if (totalPage>5) {
		if (currentPage<=3){
			$(".pageNationDiv").eq(0).find("[name='1']").val(1);
			$(".pageNationDiv").eq(0).find("[name='2']").val(2);
			$(".pageNationDiv").eq(0).find("[name='3']").val(3);
			$(".pageNationDiv").eq(0).find("[name='4']").val(4);
			$(".pageNationDiv").eq(0).find("[name='5']").val(5);
		}
		if (currentPage>3 && (currentPage+2)<totalPage) {
			$(".pageNationDiv").eq(0).find("[name='1']").val(currentPage-2);
			$(".pageNationDiv").eq(0).find("[name='2']").val(currentPage-1);
			$(".pageNationDiv").eq(0).find("[name='3']").val(currentPage);
			$(".pageNationDiv").eq(0).find("[name='4']").val(currentPage+1);
			$(".pageNationDiv").eq(0).find("[name='5']").val(currentPage+2);
		}
		if ((currentPage+2)>=totalPage) {
			$(".pageNationDiv").eq(0).find("[name='1']").val(totalPage-4);
			$(".pageNationDiv").eq(0).find("[name='2']").val(totalPage-3);
			$(".pageNationDiv").eq(0).find("[name='3']").val(totalPage-2);
			$(".pageNationDiv").eq(0).find("[name='4']").val(totalPage-1);
			$(".pageNationDiv").eq(0).find("[name='5']").val(totalPage);
		}
	}
	if (currentPage==1) {
		$(".pageNationDiv").eq(0).find(".firstBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".previousBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".nextBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".lastBtn").attr("disabled",false);
		
	}
	else if (currentPage==totalPage) {
		$(".pageNationDiv").eq(0).find(".firstBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".previousBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".nextBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".lastBtn").attr("disabled",true);
	}
	else if (totalPage==1) {
		$(".pageNationDiv").eq(0).find(".firstBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".previousBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".nextBtn").attr("disabled",true);
		$(".pageNationDiv").eq(0).find(".lastBtn").attr("disabled",true);
	}
	else{
		$(".pageNationDiv").eq(0).find(".firstBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".previousBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".nextBtn").attr("disabled",false);
		$(".pageNationDiv").eq(0).find(".lastBtn").attr("disabled",false);
	}
	$(".pageNationDiv input[value="+currentPage+"]").addClass("selectedPage").siblings().removeClass("selectedPage");

}

function toggleHandler(toggle) {
    var radio = $(toggle).find("input");
    if (radio.eq(0).is(":checked")) {
        $(toggle).removeClass("toggle-off");
    } else {
        $(toggle).addClass("toggle-off");
    }
    radio.eq(0).click(function() {
        $(toggle).toggleClass("toggle-off");
    });
    radio.eq(1).click(function() {
        $(toggle).toggleClass("toggle-off");
    });   
}


})(jq191);
