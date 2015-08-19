function <%= xc.entity_name %>EditDataGridCtrl($scope, $http, $modal, $document, $window, $interval, confirm, loading, logger, AdminService, gridDataToJson)
{
    //get static data here.
	//AdminService.getStaticData();

	// handle Broadcast from shareService when <%= xc.table_data %> is update in other controller
	$scope.$on('handleGridDataBroadcast', function(scope,action,data) {
		if(action == '<%= xc.action %>')
		{
			// reset guidanceList,and then directive will witch this value
			$scope.<%= xc.table_data %> = data;
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
		_waq.push(['Click', '<%= xc.entity_name %>ManagementAdd']);

		logger.info("Executing add()");
		$modal
		.open({templateUrl: "html/<%= xc.entity_name %>Edit.html", controller: <%= xc.entity_name %>EditCtrl,
								<%= xc.js_column_style -%>
								keyboard: false,
								resolve: {selected<%= xc.entity_name %>: null} });
	};
	$scope.update = function () {
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', '<%= xc.entity_name %>ManagementUpdate']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if(selectedItem.length != 1)
		{
			confirm.tip("Please select only one item to update");
			return ;
		}

		var guidCopy = angular.copy(selectedItem[0]);
		var modal = $modal
					.open({templateUrl: "html/<%= xc.entity_name %>Edit.html", controller: <%= xc.entity_name %>EditCtrl,
								<%= xc.js_use_two_col -%>
								keyboard: false,
								resolve: {selected<%= xc.entity_name %>: function() {return guidCopy;} } });
	};
	$scope.del = function(){
        if($scope.btn){
          return;
        }
		// Track user action
		_waq.push(['Click', '<%= xc.entity_name %>ManagementDelete']);

		// get selected from scope
		var selectedItem = $scope.getSelectedItem();
		if (selectedItem.length < 1) {
			confirm.tip("Please select at least one item to delete.");
			return;
		}
		confirm.confirm("Are you sure you want to delete the selected item(s)?",function(){
		    loading.open();
			AdminService.delete<%= xc.entity_name %>(selectedItem,function(<%= xc.table_data %>){
				// update <%= xc.table_data %> when delete completed
				$scope.<%= xc.table_data %> = angular.copy(<%= xc.table_data %>);
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
		<%= xc.js_elseif_auth_role -%>
        	$scope.btn= '';
        }else if(authList.role === "Viewer"){
        	$scope.btn= 'btn-Disabled';
        };
	};
    //======end set button state base on user authority======//

	//exportExcel with filtered data
	$scope.exportAsExcel = function() {
		var setting = $scope.dataTable.fnSettings();
		gridDataToJson(setting, '<%= xc.title %>');
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
	AdminService.get<%= xc.entity_name %>List(function(result) {
//	    loading.close();
		AdminService.getStaticData($scope.setAuth);
		$scope.<%= xc.entity_name_lower %>ListOrg = result;
		// define column style,filter,sort etc..
        $scope.columnDefs = [
         	  				{ "sClass": "center", aTargets: [ 0 ] }
         	  				,{ "bSortable": false, aTargets: [ 0 ] }
        					,{ "sClass": "left filterMultiColumn", aTargets: [ <%= xc.left_targets %> ] }
							<%= xc.js_use_right_targets -%>
        				];
        // define field to display
        $scope.<%= xc.entity_name_lower %>GridField = <%= xc.fields %>;
        // define data grid source
		$scope.<%= xc.table_data %> = angular.copy($scope.<%= xc.entity_name_lower %>ListOrg);
	});
}
