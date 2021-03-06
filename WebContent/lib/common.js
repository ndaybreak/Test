/*!
 * This JS file provides some common javascript methods
 * version: 1.00 (14-Aug-2012)
 * @requires jQuery v1.7.2 or later
 */
(function($) {
    //date format
    this.dateFormat = function () {
        var token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && (typeof date == "string" || date instanceof String) && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date?(Object.prototype.toString.call(date) === '[object Date]' ? new Date(date.getTime()):new Date(date)): new Date();
            if (isNaN(date)) throw new SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                M = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                m = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    M:    M + 1,
                    MM:   pad(M + 1),
                    MMM:  dF.i18n.monthNames[M],
                    MMMM: dF.i18n.monthNames[M + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    m:    m,
                    mm:   pad(m),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

// Some common format strings
    dateFormat.masks = {
        "default":      "ddd MMM dd yyyy HH:mm:ss",
        shortDate:      "M/d/yy",
        mediumDate:     "MMM d, yyyy",
        longDate:       "MMMM d, yyyy",
        fullDate:       "dddd, MMMM d, yyyy",
        shortTime:      "h:mm TT",
        mediumTime:     "h:mm:ss TT",
        longTime:       "h:mm:ss TT Z",
        isoDate:        "yyyy-MM-dd",
        isoTime:        "HH:mm:ss",
        isoDateTime:    "yyyy-MM-dd'T'HH:mm:ss",
        isoUtcDateTime: "UTC:yyyy-MM-dd'T'HH:mm:ss'Z'"
    };
    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };
    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

	//allows user to apply a magnification to highly detailed image
	this.imageZoomIn = function() {
		var xOffset = 10;
		var yOffset = 30;
		//build the highly detail image element
		$("img.preview").hover(
			function(e) {
				this.t = this.title;
				this.title = "";
				var c = (this.t != "") ? "<br/>" + this.t : "";
				$("body").append(
						"<p id='preview'><img src='"+ this.src +"' alt='" + this.t + "' />"
								+ c + "</p>");
				$("#preview").css("top", (e.pageY - xOffset) + "px").css(
						"left", (e.pageX + yOffset) + "px").css("z-index",
						"1").fadeIn("fast");
			}, function() {
				this.title = this.t;
				$("#preview").remove();
		});
		//show the highly detail image
		$("img.preview").mousemove(function(e) {
			$("#preview").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px");
		});
	};
	
	//Convert data with date format to string format(MM/DD/YYYY)
	this.convertDateToString = function(date){
		if(date instanceof Date){
			var str = "";
			ayear = date.getFullYear(); 
			amonth = date.getMonth(); 
			aday = date.getDate(); 
			str = ""; 
			str += ((amonth+1) <10)?( "0"+(amonth+1)):(amonth+1); 
			str += "/" ;
			str += (aday <10)?( "0"+aday):aday; 
			str += "/" ;
			str += ayear; 
			return str;
		}
		return "";
	};
	
	// validate the upload file type whether is correspond to the specific type.
	this.validateFileType = function(fileType,fileInputId) {
		var fileName = $("#"+fileInputId).val();
		//get the extend of the file
		var extend = fileName.substring(fileName.lastIndexOf(".")+1); 
		if (fileName == "undefined" || fileName == "" || fileName == null) {
			return false;
		} else if(extend.toLowerCase() != fileType.toLowerCase()){
			return false;
		}
		return true;
	}
	
	//Set the background of element with specific color
	this.setBgColorByElementId= function(elementId,color){
		if( color == "green"){
			$("#" + elementId).css("background-color","#00BFF3");
		}else if(color == "red") {
			$("#" + elementId).css("background-color", "#FF0000");
		}else if(color == "yellow"){
			$("#" + elementId).css("background-color", "#FFF68F");
		}else{
			$("#" + elementId).css("background-color", color);
		}
	};
	
	//open the confirm dialog,set the message and callback with given paramaters
	var mDialogCallback;
    this.popupConfirmDialogMsg = function(msg,callback) {
		//set the callback function
		mDialogCallback = callback;
		//set confirm message and open the confirm dialog
		$('#confirmDialogMessageBody').html(msg);
		$('#confirmDialogDiv').dialog('open');
	};
	
	//init a confirm dialog which contains Sure and Cancle buttons,"Sure" return true and "Cancle" return false.
	this.initConfirmDialog = function(dialogDivId){
		$('#'+dialogDivId).dialog({
			//below is the configuration of the dialog,you can define your own style dialog
		   autoOpen: false,
		   height:150,
		   width: 400,
		   show: "blind",
		   hide: "fold",
		   modal: true,
		   buttons: {
			   "Sure": function() {
				   $(this).dialog('close');
				   //invoke the callback function
				   mDialogCallback(true);
			   },
				"Cancel": function() {
				   $(this).dialog('close');
				   //invoke the callback function
				   mDialogCallback(false);
			   }
		   }
		});
	};

	/**
    *convert json to string
    */
	this.json2str = function(o) {
	    var arr = [];
		var fmt = function(s) {
		   if (typeof s == 'object' && s != null) return json2str(s);
		   return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
		}
	    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	    return '{' + arr.join(',') + '}';
	};
	
	this.convertUndefinedValue=function(value){
	  if (value==undefined){
	    value="";
	  }
	  return value;
	};

    this.getFormatDateByLong=function(s, pattern){
		if (s== undefined || s=='NaN'){
		  return "";
		}else {
		  return getFormatDate(new Date(parseInt(s)), pattern);
		}
        
    };
    this.getFormatDate=function(date, pattern){
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    };	
	
	//return the current browser
	this.getOs=function(){  
		if(navigator.userAgent.indexOf("MSIE")>0) {  
			return "MSIE";  
		}  
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
			return "Firefox";  
		}  
		if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
			return "Safari";  
		}   
		if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
			return "Camino";  
		}  
		if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
			return "Gecko";  
		}   
		return "";
	};
		
	this.configMessageColorAndContext=function(elementId,fontColor,messageContext){
		$("#"+elementId).css("color",fontColor);
		$("#"+elementId).html(messageContext);
	}


    //common View model
    this.ViewForm ={
        createView:function(){
            var tempView = {
                uuid:"",
                userName:"",
                pageName:"",
                viewName:"",
                filterJsonString:"",
                modifiedBy:"",
                modifiedyDate:"",
                iconText:"",
                groupName:"",
                description:"",
                comment:"",
                isDefaultView:"N",
                viewOrPreference:"preference"
            };
            return tempView;
        },
        serializeForm2JSON:function(element,excludeSelector){
            var result,record = {},excludeSelectorStr="";
            if(excludeSelector != null){
                excludeSelectorStr = ":not("+excludeSelector.join(",")+")";
            }
            //to ignore the input element in multiple filter selecter
            if($(element)[0].tagName.toUpperCase()=="FORM"){
                result = excludeSelectorStr==""?$(element).serializeArray():$(element).find(excludeSelectorStr).serializeArray();
            }else{
                result = excludeSelectorStr==""?$(element).find(":input:visible").serializeArray():$(element).find(":input:visible"+excludeSelectorStr).serializeArray();
            }
//            $(".TableHeaderRow :input").serialize();

            $.each(result, function() {
                if (record[this.name] !== undefined) {
                    if (!record[this.name].push) {
                        record[this.name] = [ record[this.name] ];
                    }
                    record[this.name].push(this.value || '');
                } else {
                    record[this.name] = this.value || '';
                }
            });
            return $.toJSON(record);
        },
        loadView:function(jsonString,element){
            this.reset(element);
            var $formObj= $(element),jsonObject =  jsonString;
            if(typeof jsonString == "string"){
                jsonObject = eval('('+jsonString+')');
            }
//                console.log("load view is"+jsonString);
            for(var x in jsonObject){
                var $obj = $formObj.find("[name='"+x+"']");
                if($obj != null && !$.isEmptyObject($obj) && $obj[0] != null ){
                    if($obj[0].tagName.toUpperCase()=="SELECT"){
                        $($obj[0]).val(jsonObject[x]);
                        $obj.next().find(".selecter-options span").removeClass("selected");
                        if($($obj[0]).attr("multiple")!=undefined && $($obj[0]).attr("multiple")!=""){
                            var selectedStr = "";
                            $obj.next().find("input.selcheck").prop("checked",false);
                            $obj.next().find("div.selecter-options span.selected").removeClass("selected");
                            if($.isArray(jsonObject[x])){
                                $(jsonObject[x]).each(function(index){
                                    $obj.next().find(".selecter-options span[data-value='"+jsonObject[x][index]+"']").addClass("selected");
                                    $obj.next().find("input[type='checkbox'][value='"+jsonObject[x][index]+"']").prop("checked",true);
                                    selectedStr += $obj.next().find(".selecter-options span[data-value='"+jsonObject[x][index]+"']").text()+"; ";
                                });
                            }else{
                                $obj.next().find(".selecter-options span[data-value='"+jsonObject[x]+"']").addClass("selected");
                                $obj.next().find("input[type='checkbox'][value='"+jsonObject[x]+"']").prop("checked",true);
                                selectedStr+= $obj.next().find(".selecter-options span[data-value='"+jsonObject[x]+"']").text()+"; ";
                            }
                            selectedStr =selectedStr.substring(0, selectedStr.lastIndexOf(";"));
//                                if($obj.next().find("input.selcheck").length>0){
                            $obj.next().find("span.selecter-selected").html(selectedStr);
                            $obj.next().find("span.selecter-selected").attr("title",selectedStr);
//                                }else{
//                                    $obj.next().find("span.selecter-selected").html(selectedStr+"...");
//                                    $obj.next().find("span.selecter-selected").attr("title",selectedStr);
//                                }
                        }else{
                            $obj.next().find(".selecter-options span.selected").removeClass("selected");
                            $obj.next().find(".selecter-options span[data-value='"+jsonObject[x]+"']").addClass("selected");
                            $obj.next().find("span.selecter-selected").html($obj.next().find(".selecter-options span[data-value='"+jsonObject[x]+"']").text());
                        }
//                        $obj.next().find(".selecter-selected").html($.join(",",jsonObject[x]));
                    }else if($obj[0].tagName.toUpperCase()=="INPUT" && $($obj[0]).attr("type").toUpperCase() == "RADIO"){
                        $formObj.find("[name='"+x+"'][value!="+jsonObject[x]+"]").prop("checked",false);
                        $formObj.find("[name='"+x+"'][value="+jsonObject[x]+"]").prop("checked",true);
                        if(navigator.appVersion.indexOf("MSIE 8.")!=-1){
                            $formObj.find("[name='"+x+"']:checked").next().find('span').addClass("rcheckclass");
                            $formObj.find("[name='"+x+"']:not(:checked)").next().find('span').removeClass("rcheckclass");
                        }
                    }else if($obj[0].tagName.toUpperCase()=="INPUT" && $($obj[0]).attr("type").toUpperCase() == "CHECKBOX"){
                        $formObj.find("[name='"+x+"']").prop("checked",false);
                        if($.isArray(jsonObject[x])){
                            $(jsonObject[x]).each(function(index){
//                            $formObj.find("[name='"+x+"'][value!="+jsonObject[x][index]+"]").prop("checked",false);
                                $formObj.find("[name='"+x+"'][value="+jsonObject[x][index]+"]").prop("checked",true);
                            });
                        }else{
                            $formObj.find("[name='"+x+"'][value="+jsonObject[x]+"]").prop("checked",true);
                        }
                        if(navigator.appVersion.indexOf("MSIE 8.")!=-1){
                            $formObj.find("[name='"+x+"']:checked").next().find('span').addClass("rcheckclass");
                            $formObj.find("[name='"+x+"']:not(:checked)").next().find('span').removeClass("rcheckclass");
                        }

                    }else{
                        $formObj.find("[name='"+x+"']").val(jsonObject[x]);
                    }
                }
            }
        },
        reset:function(element){
            if($(element)[0].tagName.toUpperCase()=="FORM"){
                $(element)[0].reset();
            }
            resetFormPlugin($(element));
        }
    }
    var resetFormPlugin = function(formObj){
        var $selecter =  formObj.find("select.selecter-element + div.selecter"),
            $radios = formObj.find("input[type='radio'].cstmeinput"),
            $checkbox = formObj.find("input[type='checkbox'].cstmeinput");
        $selecter.each(function(i){
            resetSelecterPluginCommon($(this));
        });
//             console.log("Total "+$selecter.length+" selecter,"+$radios.length+" $radios,"+$checkbox.length+" checkbox");
    }
    this.resetSelecterPluginCommon = function(selectObj){
        var $selectObj = $(selectObj);
        var selecterValue = $(selectObj).val();
        $selectObj.find(".selecter-options span").removeClass("selected");
        if($selectObj.prev().attr("multiple")!=undefined && $selectObj.prev().attr("multiple")!=""){
            var selectedStr = "";
            $selectObj.find("input.selcheck").prop("checked",false);
            $selectObj.find("div.selecter-options span.selected").removeClass("selected");
            if($.isArray(selecterValue)){
                $(selecterValue).each(function(index){
                    $selectObj.find(".selecter-options span[data-value='"+selecterValue[index]+"']").addClass("selected");
                    $selectObj.find("input[type='checkbox'][value='"+selecterValue[index]+"']").prop("checked",true);
                    selectedStr += $selectObj.find(".selecter-options span[data-value='"+selecterValue[index]+"']").text()+"; ";
                });
            }else{
                $selectObj.find(".selecter-options span[data-value='"+selecterValue+"']").addClass("selected");
                $selectObj.find("input[type='checkbox'][value='"+selecterValue+"']").prop("checked",true);
                selectedStr += $selectObj.find(".selecter-options span[data-value='"+selecterValue+"']").text()+"; ";
            }
            selectedStr =selectedStr.substring(0, selectedStr.lastIndexOf(";"));
            $selectObj.find("span.selecter-selected").html(selectedStr);
            $selectObj.find("span.selecter-selected").attr("title",selectedStr);

        }else{
            $selectObj.find(".selecter-options span.selected").removeClass("selected");
            $selectObj.find(".selecter-options span[data-value='"+selecterValue+"']").addClass("selected");
            $selectObj.find("span.selecter-selected").html($selectObj.find(".selecter-options span[data-value='"+selecterValue+"']").text());
        }
    }
	
	
})(jq191);