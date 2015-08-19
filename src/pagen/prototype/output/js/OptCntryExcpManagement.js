function OptCntryExcpEditDataGridCtrl($scope, $http, $modal, $document, $window, $interval, confirm, loading, logger, AdminService, gridDataToJson)
{
    //get static data here.
	//AdminService.getStaticData();

	// handle Broadcast from shareService when optCntryExcpList is update in other controller
	$scope.$on('handleGridDataBroadcast', function(scope,action,data) {
		if(action == 'optCntryExcp')
		{
			// reset guidanceList,and then directive will witch this value
			$scope.optCntryExcpList = data;
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
		_waq.push(['Click', 'OptCntryExcpManagementAdd']);

		logger.info("Executing add()");
		$modal
		.open({templateUrl: "html/OptCntryExcpEdit.html", controller: OptCntryExcpEditCtrl,
								windowClass : 'oneCol',
								keyboard: false,
								resolve: {selectedOptCntryExcp: null} });
	};
	$scope.update = function () {
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', 'OptCntryExcpManagementUpdate']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if(selectedItem.length != 1)
		{
			confirm.tip("Please select only one item to update");
			return ;
		}

		var guidCopy = angular.copy(selectedItem[0]);
		var modal = $modal
					.open({templateUrl: "html/OptCntryExcpEdit.html", controller: OptCntryExcpEditCtrl,
								
								keyboard: false,
								resolve: {selectedOptCntryExcp: function() {return guidCopy;} } });
	};
	$scope.del = function(){
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', 'OptCntryExcpManagementDelete']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if (selectedItem.length < 1) {
			confirm.tip("Please select at least one item to delete.");
			return;
		}
		confirm.confirm("Are you sure you want to delete the selected item(s)?",function(){
		    loading.open();
			AdminService.deleteOptCntryExcp(selectedItem,function(optCntryExcpList){
				// update optCntryExcpList when delete completed
				$scope.optCntryExcpList = angular.copy(optCntryExcpList);
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
		gridDataToJson(setting, 'Country Exception');
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
	AdminService.getOptCntryExcpList(function(result) {
//	    loading.close();
		AdminService.getStaticData($scope.setAuth);
		$scope.optCntryExcpListOrg = result;
		// define column style,filter,sort etc..
        $scope.columnDefs = [
         	  				{ "sClass": "center", aTargets: [ 0 ] }
         	  				,{ "bSortable": false, aTargets: [ 0 ] }
        					,{ "sClass": "left filterMultiColumn", aTargets: [ 1,2,3,4,5,6,7,8 ] }
							
        				];
        // define field to display
        $scope.optCntryExcpGridField = ["regionForDisplay", "subRegion1ForDisplay", "subRegion2ForDisplay", "subRegion3ForDisplay", "cntryCdForDisplay", "note", "lastModByEmail", "lastModTs"];
        // define data grid source
		$scope.optCntryExcpList = angular.copy($scope.optCntryExcpListOrg);
	});
}
