function OptBuCustExcpEditDataGridCtrl($scope, $http, $modal, $document, $window, $interval, confirm, loading, logger, AdminService, gridDataToJson)
{
    //get static data here.
	//AdminService.getStaticData();

	// handle Broadcast from shareService when optBuCustExcpList is update in other controller
	$scope.$on('handleGridDataBroadcast', function(scope,action,data) {
		if(action == 'optBuCustExcp')
		{
			// reset guidanceList,and then directive will witch this value
			$scope.optBuCustExcpList = data;
		}
    });
    $scope.$on('handleErrorOcurs', function(scope, msg, url) {
        if(!url){
    		return;
    	}
		if(url.indexOf('massDelete')>-1){
			//just handle delete operation error when user has not authority
			loading.close();
			confirm.tip(msg);
		}

		//XXX: add other error handle operation here
	});
	$scope.add = function () {
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', 'OptBuCustExcpManagementAdd']);

		logger.info("Executing add()");
		$modal
		.open({templateUrl: "html/OptBuCustExcpEdit.html", controller: OptBuCustExcpEditCtrl,
								windowClass : 'oneCol',
								keyboard: false,
								resolve: {selectedOptBuCustExcp: null} });
	};
	$scope.update = function () {
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', 'OptBuCustExcpManagementUpdate']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if(selectedItem.length != 1)
		{
			confirm.tip("Please select only one item to update");
			return ;
		}

		var guidCopy = angular.copy(selectedItem[0]);
		var modal = $modal
					.open({templateUrl: "html/OptBuCustExcpEdit.html", controller: OptBuCustExcpEditCtrl,
								
								keyboard: false,
								resolve: {selectedOptBuCustExcp: function() {return guidCopy;} } });
	};
	$scope.del = function(){
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', 'OptBuCustExcpManagementDelete']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if (selectedItem.length < 1) {
			confirm.tip("Please select at least one item to delete.");
			return;
		}
		confirm.confirm("Are you sure you want to delete the selected item(s)?",function(){
		    loading.open();
			AdminService.deleteOptBuCustExcp(selectedItem,function(optBuCustExcpList){
				// update optBuCustExcpList when delete completed
				$scope.optBuCustExcpList = angular.copy(optBuCustExcpList);
				loading.close();
			});
		});
	};
    //======set button state base on user authority======//
    $scope.btn= 'btn-Disabled';
	$scope.setAuth = function(){
        var authList = AdminService.getAuthList(); // Admin, Viewer, Super User, Sales Comp Admin
        if(authList.role === "Super User"){
        	$scope.btn= '';
		}else if(authList.role === "Admin"){
        	$scope.btn= '';
        }else if(authList.role === "Viewer"){
        	$scope.btn= 'btn-Disabled';
        };
	};
    //======end set button state base on user authority======//

	//exportExcel with filtered data
	$scope.exportAsExcel = function() {
		var setting = $scope.dataTable.fnSettings();
		gridDataToJson(setting, 'BU-Customer Exception');
	};

	//disable export when no data
	var trigger = $interval(function(){
		// jQuery code here
		if(typeof $scope.dataTable != "undefined"){
			var settings = $scope.dataTable.fnSettings();
			if(settings != null && settings.aiDisplay.length > 0){
				$scope.data = true;
			}else{
				$scope.data = false;
			}
		}
	}, 1000);
	trigger;

	//disable click backspace button direct to before page.
	$window.setTimeout($document.bind("keydown keypress", function (event) {
        if (event.currentTarget.activeElement.tagName !="INPUT" && event.currentTarget.activeElement.tagName !="TEXTAREA" && event.which === 8) {
        	$scope.$apply(function () {
        		$scope.$eval();
            });
            event.preventDefault();
        }
    }), 0);

	// init data grid
    loading.open();
	AdminService.getOptBuCustExcpList(function(result) {
//	    loading.close();
		AdminService.getStaticData($scope.setAuth);
		$scope.optBuCustExcpListOrg = result;
		// define column style,filter,sort etc..
        $scope.columnDefs = [
         	  				{ "sClass": "center", aTargets: [ 0 ] }
         	  				,{ "bSortable": false, aTargets: [ 0 ] }
        					,{ "sClass": "left filterMultiColumn", aTargets: [ 1,2,3,4,5,6,7,8,9,10,11 ] }
							
        				];
        // define field to display
        $scope.optBuCustExcpGridField = ["rgnCdForDisplay", "subregn1CdForDisplay", "subregn2CdForDisplay", "subregn3CdForDisplay", "cntryCdForDisplay", "busUnitForDisplay", "mdcpOrgId", "amid2", "note", "lastModByEmail", "lastModTs"];
        // define data grid source
		$scope.optBuCustExcpList = angular.copy($scope.optBuCustExcpListOrg);
	});
}
