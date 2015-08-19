(function($) {var inputs = $("form input");
inputs.each(function(){
    if($(this).attr("required")!= null){
        $(this).addClass("required");
    }
});
inputs.keyup(function(e){
    if($(this).attr("required") != null){
        if($.trim($(this).val()) ==""){
            $(this).removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").css("background","#FF0000");
            $(this).parent().find("span.form_hint").css("color","white");
        }else{
            $(this).removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").css("background","#28921f");
            $(this).parent().find("span.form_hint").css("color","white");
        }
    }
});
inputs.click(function(e){
    if($(this).attr("required") != null){
        if($.trim($(this).val()) ==""){
            $(this).removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").css("background","#FF0000");
            $(this).parent().find("span.form_hint").css("color","white");
        }else{
            $(this).removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").css("background","#28921f");
            $(this).parent().find("span.form_hint").css("color","white");
        }
    }
});

var textAreas = $("form textarea");
textAreas.each(function(){
    if($(this).attr("required")!= null){
        $(this).addClass("required");
    }
});
textAreas.keyup(function(e){
    if($(this).attr("required") != null){
        if($.trim($(this).val()) ==""){
            $(this).removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").css("background","#FF0000");
            $(this).parent().find("span.form_hint").css("color","white");
        }else{
            $(this).removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").css("background","#28921f");
            $(this).parent().find("span.form_hint").css("color","white");
        }
    }
});
textAreas.click(function(e){
    if($(this).attr("required") != null){
        if($.trim($(this).val()) ==""){
            $(this).removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").removeClass("valid").addClass("invalid");
            $(this).parent().find("span.form_hint").css("background","#FF0000");
            $(this).parent().find("span.form_hint").css("color","white");
        }else{
            $(this).removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").removeClass("invalid").addClass("valid");
            $(this).parent().find("span.form_hint").css("background","#28921f");
            $(this).parent().find("span.form_hint").css("color","white");
        }
    }
});

})(jq191);