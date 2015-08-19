<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type"
	"C:/soft/js/jquery.dataTables.js" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="css/icomoon.min.css">
<link rel="stylesheet" href="css/jquery-ui-1.10.2.custom.css">
<link href="css/style.css" rel="stylesheet" />
</head>
<body>
	<section class="container left"> <br>
	<div id="resultTable">
		<table id="search_result" class="TableBackground search_result">
			<thead>
				<tr class="TableHeaderRow">
					<th>NO</th>
					<th>Text Column</th>
					<th>Link Column</th>
					<th>Icon Column</th>
					<th>Number Column</th>
					<th>Sorted Column</th>
					<th>Unsortable Column</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	</section>
	<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
	<script>
		var jq191 = jQuery.noConflict(true);
		window.jQuery = window.$ = jq191;
	</script>
	<script type="text/javascript" src="js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.ext.js"></script>
	<script type="text/javascript" src="js/ColVis.js"></script>
	<script type="text/javascript" src="js/ColReorderWithResize.js"></script>
	<script type="text/javascript" src="js/jquery.fs.selecter.js"></script>
	<script type="text/javascript">
		var resultTable = $("#resultTable");
		var table = $("table#search_result");
		aaData = [];
		for (var i = 0; i < 65000; i++) {
			aaData.push([ i + 1, "text columns align left",
					"<a>link columns align center</a>",
					"<i class='icon-ok'></i>", "$10.0", "sorted columns" + i,
					"unsortable columns" ]);
		}
		// define sort icon style, this is required.
		$.fn.dataTableExt.oJUIClasses.sSortJUI = "css_right icon-sort";
		$.fn.dataTableExt.oJUIClasses.sSortJUIAsc = "css_right icon-sort-up";
		$.fn.dataTableExt.oJUIClasses.sSortJUIDesc = "css_right icon-sort-down";
		oTable = $("table#search_result")
				.dataTable(
						{
							"aaSorting" : [ [ 5, "asc" ] ],
							"aaData" : aaData,
							"sPaginationType" : "commonStandard", // define pagination show style is commonStandard. if sDom has p, this required.
							"bPaginate" : true,
							"bJQueryUI" : true,
							"bRetrieve" : true,
							"bDestroy" : true,
							"sDom" : '<"t_header"RrClf><"t_body"t><"t_footer"pi>',
							// define the dataTable structure
							// C means view by, l means view results by length, f means filter input box, t is table content, p is pagination, i is information, R means be dragable. if your table don>t need all of this, just don>t add that letter, but if you use it, must the same as the sequence displayed here. Important!
							"bSortClasses" : false,
							"aoColumnDefs" : [ {
								"sClass" : "center",
								"aTargets" : [ 2, 3 ]
							}, {
								"sClass" : "center unsortable",
								"aTargets" : [ 0 ]
							}, {
								"sClass" : "left",
								"aTargets" : [ 1, 5 ]
							}, {
								"sClass" : "left unsortable",
								"aTargets" : [ 6 ]
							},
							// For the colunms that bSortable is false, set its sClass as unsortable, this is required if you includes ColReorderWithResize.js for your datatable 
							{
								"sClass" : "right",
								"aTargets" : [ 4 ]
							}, {
								"bSortable" : false,
								"aTargets" : [ 0, 6 ]
							} ],
							"oColReorder" : {
								"iFixedColumns" : 2
							// Define how many columns from left that can not be dragged.
							},
							"fnDrawCallback" : function(oSettings) {
								if (oSettings.bSorted || oSettings.bFiltered) {
									for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
										$(
												'td:eq(0)',
												oSettings.aoData[oSettings.aiDisplay[i]].nTr)
												.html(i + 1);
									}
								}
							},
							"oLanguage" : {
								"sLengthMenu" : "<div class='sLengthText'>View Results of</div> _MENU_ ",//if sDom has l, this is required
								"sInfo" : "<span class='number_highlight'>_TOTAL_</span> items, <span class='number_highlight'>_TOTALPAGE_</span> pages",//if sDom has p, this is required
								"sSearch" : "Filter:",//if sDom has f, this is required
								"sInfoFiltered" : "",//if sDom has f, this is required
								"sInfoEmpty" : "<span class='number_highlight'>0</span> items, <span class='number_highlight'>0</span> pages",
								//if the search result is empty, show "0 items, 0 pages" required
								"oPaginate" : { // define pagination button style, if sDom has p, this required.
									"sFirst" : "<i class='icon-double-angle-left'></i>",
									"sLast" : "<i class='icon-double-angle-right'></i>",
									"sNext" : "<i class='icon-angle-right'></i>",
									"sPrevious" : "<i class='icon-angle-left'></i>"
								}
							},
							"oColVis" : { // define view by function styleif sDom has C, this is required
								"buttonText" : 'View By <i class="icon-chevron-down"></i>',
								"aiExclude" : [ 0 ],//define the column don>t need to display in view by
								"bShowAll" : true,
								"sShowAll" : "Show All",
								"sAlign" : "left"
							}
						});
		$("#search_result_length select").selecter();//it change selecter to hp standard style. if sDom has l, this is required, pay attention, the id #search_result_length is variable by your own datatable. here the datatable id is #search_result, so it is #search_result_length, if your datatable id is #mydatatable-id, here is #mydatatable-id_length
	</script>
</body>
</html>