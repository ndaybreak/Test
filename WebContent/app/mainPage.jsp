<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
</html>
<html lang="en" ng-app="myApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script>
		<%
		String basePath = request.getScheme() + "://"
				+ request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		%>
		var BASE_URL = "<%=basePath%>";
	</script>
  <link type="text/css" rel="stylesheet" href="../css/register.css">
  
   <link rel="stylesheet" href="../css/jquery-ui.css">
   
  <script src="js/vendor/jquery-1.10.2.min.js"></script>
  <script src="js/vendor/jquery-ui-1.11.0.js"></script>
  
  <script src="../lib/angular/angular.js"></script>
  <!-- <script src="../lib/angular/angular.21.js"></script> -->
  <script src="../lib/angular/angular-route.js"></script>
  <script src="../lib/angular/ui-bootstrap-tpls-0.11.0.js"></script>
  
  <script src="js/app.js"></script>
  <script src="js/uiDirective.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/controllers/menuController.js"></script>
  <script src="js/controllers/dataBindController.js"></script>
  <script src="js/controllers/directiveController.js"></script>
  <script src="js/controllers/datePickerController.js"></script>
  <script src="js/controllers/tabsController.js"></script>
  <script src="js/controllers/tabContentController.js"></script>
  <script src="js/controllers/scrollController.js"></script>
  <script src="js/controllers/fileUploadController.js"></script>
</head>
<body>
	<div class="menu">
		<h2>
			<a href="#/dataBindTest">Data Binding</a>
			<a href="#/directiveTest">Directive Demo</a>
			<a href="#/datePickerTest">DatePicker</a>
			<a href="#/tabsTest">Tabs Demo</a>
			<a href="#/scroll">Scroll Demo</a>
			<!-- <a href="#/fileUpload">File Upload</a> -->
		</h2>
	</div>
  <div ng-view></div>

</body>
</html>