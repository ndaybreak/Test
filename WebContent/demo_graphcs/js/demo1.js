var modules,
	oraginalData, 
	item,
	graphcsArg,
	sBts,
	activeValueType;
//default value
modules = ['getGuidance','pricing','dddddd'];
oraginalData = [];
for (var i = 0, len = modules.length; i < len; i++) {
	item = [];
	for (var j = 0; j < 12; j++) {
		if(i < 5){
			item.push({
				date : '2014-' + (j + 8),
				medianAndmean : [(i + 6) * (j + 1) * (j + 5) - 2,(j + 1)*( j + 10) + 2*(j+3) - (i + 2),j+i*3,j+i*4]
			});
		}else{
			item.push({
				date : '2015-' + (j - 4),
				medianAndmean : [(i + 6) * (j + 1) * (j + 5) - 2,(j + 1)*( j + 10) + 2*(j+3) - (i + 2),j+i*3,j+i*4]
			});
		}
		
	}
	oraginalData.push(item);
}

for (var i = 0; i < oraginalData.length; i++) {
	oraginalData[i] = MG.convert.date(oraginalData[i], 'date', '%Y-%m');
}

var defaults = {
        target: '#fake_users2',
        chart_type: 'bar',
        x_accessor: 'value',
        y_accessor: 'label',
        transition_on_update: false,
        data: [[{
            label: 'Bar 1',
            value: 100
        },{
            label: 'Bar 2',
            value: 200
        },{
            label: 'Bar 3',
            value: 300
        }],
        [{
            label: 'Bar 5',
            value: 100
        },{
            label: 'Bar 6',
            value: 200
        },{
            label: 'Bar 7',
            value: 300
        }]
        ]
    };
MG.data_graphic(defaults);

graphcsArg = {
		width : 600,
		height : 250,
		right : 40, 
		bottom : 40, 
		//top: 20, 
		area: false,
		xax_count: 12, 
		target : '#fake_users2',
		//x_accessor : 'date',
		//y_accessor : 'value',
		legend : ['Median','Mean'],
		xax_tick_length: 7, 
		//x_extended_ticks: true,
		y_extended_ticks: true,
		//show_secondary_x_label: false,
		//animate_on_load: false, 
		xax_format: function(f) {
			var df = d3.time.format('%b');
            var date = df(f);
            return date;
            //var pf = d3.formatPrefix(f);
            //return Math.round(pf.scale(f)) + pf.symbol;
	    },
		mouseover: function(d, i) {
			var df = d3.time.format('%b, %Y');
            var date = df(d.date);
            var y_val = (d.value === 0 || d.value === '') ? 'no data' : d.value;

            d3.select('#fake_users2 svg .mg-active-datapoint').html('Time: ' + date + '  Value: ' +'   ' + y_val + '   Count: ' + d.count);
		}
};
sBts = '';
//--------------------
for(var i = 0, len = modules.length; i < len; i++){
	sBts += '<button moduleId="' + i + '">' + modules[i] + '</button>';
}
$('div.btsDiv').html(sBts)
			   .on('click',function(e){
				   var target = $(e.target);
				   if(target.hasClass('active')){
					   return;
				   }
				   if(typeof target.attr('moduleId') !== 'undefined'){
					   target.siblings().removeClass('active');
					   target.toggleClass('active');
					   //redrawGraphcs();
				   }
			   });
$('div.btsDiv').children().eq(0).click();


function redrawGraphcs(){
	var activeModuleId = $('button.active','div.btsDiv').attr('moduleId');
	$('#fake_users2').html('');
	graphcsArg.data = getScreenData(oraginalData[activeModuleId]);
	graphcsArg.title = modules[activeModuleId];
	MG.data_graphic(graphcsArg);
}

function getScreenData(data){
	if(!data)
		return;
	var newData = [],
		aMedian = newData[0] = [],
		aMean = newData[1] = [],
		tempObj;
	for(var i = 0, len = data.length; i < len; i++){
		tempObj = data[i];
		aMedian.push({
			date : tempObj.date,
			value : tempObj.medianAndmean[0],
			count : tempObj.medianAndmean[2]
		});
		aMean.push({
			date : tempObj.date,
			value : tempObj.medianAndmean[1],
			count : tempObj.medianAndmean[3]
		});
	}
	
	return newData;
}