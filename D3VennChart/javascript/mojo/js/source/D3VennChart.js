(function () {
    if (!mstrmojo.plugins.D3VennChart) {
        mstrmojo.plugins.D3VennChart = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.CustomVisBase",
        "mstrmojo.models.template.DataInterface"
    );

    mstrmojo.plugins.D3VennChart.D3VennChart = mstrmojo.declare(
        mstrmojo.CustomVisBase,
        null,
        {
            scriptClass: "mstrmojo.plugins.D3VennChart.D3VennChart",

            cssClass: "d3Vennchart",

            errorDetails: "This visualization requires one or more attributes and one metric.",

            externalLibraries: [{url:"http://d3js.org/d3.v3.min.js"},{url:"http://code.jquery.com/jquery-latest.js"},{url:"images\\venn.js"}],

            useRichTooltip: true,

            reuseDOMNode: true,

            plot: function () {
				

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
				/*
				

				
				

				var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = parseInt(this.width,10) - margin.left - margin.right,
    height = parseInt(this.height,10) - margin.top - margin.bottom;
	var x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0, .1);
	var x1 = d3.scale.ordinal();var y = d3.scale.linear().range([height, 0]);
	var color = d3.scale.ordinal().range(["#2DBAD4", "#33CC33", "#00E6B8", "#C9081D"]);
	var xAxis = d3.svg.axis().scale(x0).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".2s"));
	var svg = d3.select(this.domNode).append("svg").attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	*/
	
var data = this.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS);


var metricName=[],A,B,C,AB,BC,AC,ABC,keyValue=[],valueKey=[];


var gridData = this.dataInterface;
var rowHeaders = gridData.getRowHeaders();
var attributeName = rowHeaders.titles[0].n;
for (var i = 0; i < data.length; i++) {
for (var key in data[i]) {
if (key !== attributeName) {
data[i][key] = data[i][key]["rv"] + "";
metricName.push([key,data[i][key]]);
}
}
}

console.log(metricName);
metricName.sort(function(a, b){ if(a[0].indexOf("-") == -1){return -1;}else {return 1;}});

console.log(metricName);
		var obj_valueKey={};
		var obj_keyValue={};
for(var i=0;i<metricName.length;i++){
	if(metricName[i][0].indexOf("-")==-1)
	{
		console.log("if begin");

		
		if(A==null){A=metricName[i][0];obj_keyValue['A']=A;obj_keyValue['Avalue']=metricName[i][1];obj_valueKey[metricName[i][0]]='A';}
		else if(B==null){B=metricName[i][0];obj_keyValue['B']=B;obj_keyValue['Bvalue']=metricName[i][1];obj_valueKey[metricName[i][0]]='B';}
		else{C=metricName[i][0];obj_keyValue['C']=C;obj_keyValue['Cvalue']=metricName[i][1];obj_valueKey[metricName[i][0]]='C';}
;	
	}
	if(i==2){keyValue.push(obj_keyValue);valueKey.push(obj_valueKey);}

	if(metricName[i][0].indexOf("-")>0){
		var tmpList=metricName[i][0].split("-");
		if(tmpList.length==2){
			
			//var obj_tmp={};
			keyValue[0][(valueKey[0][tmpList[1]]+valueKey[0][tmpList[0]]).split('').sort().join('')]=metricName[i][0];
			keyValue[0][(valueKey[0][tmpList[1]]+valueKey[0][tmpList[0]]).split('').sort().join('')+'value']=metricName[i][1];
			
			//keyValue.push(obj_tmp);
		}
		if(tmpList.length==3){
			//var obj_tmp={};
			keyValue[0][(valueKey[0][tmpList[0]]+valueKey[0][tmpList[1]]+valueKey[0][tmpList[2]]).split('').sort().join('')]=metricName[i][0];
			keyValue[0][(valueKey[0][tmpList[0]]+valueKey[0][tmpList[1]]+valueKey[0][tmpList[2]]).split('').sort().join('')+'value']=metricName[i][1];
			//keyValue.push(obj_tmp);
			
		}
		
	}
	
}


;


	
/*
var p1="Pepsi",p2="cococola",p3="fanta",p4="ChinaDrink";
var c1="india",c2="china",c3="USA";
*/


//------------------ Need to make this Dynamic -----------------------------------------
var sets=[ {sets: [keyValue[0].A], size:keyValue[0].Avalue},
			{sets:[keyValue[0].B],size:keyValue[0].Bvalue},
			{sets:[keyValue[0].C],size:keyValue[0].Cvalue},
			{sets:[keyValue[0].A,keyValue[0].B],size:keyValue[0].ABvalue},
			{sets:[keyValue[0].A,keyValue[0].C],size:keyValue[0].ACvalue},
			{sets:[keyValue[0].B,keyValue[0].C],size:keyValue[0].BCvalue},
			{sets:[keyValue[0].A,keyValue[0].B,keyValue[0].C],size:keyValue[0].ABCvalue}];
			//{sets:["Pepsi","India"],size:data[0]['Pepsi India']}];
			//{sets:["Cocacola","India"],size:data[0]['Cocacola India']},
			//{sets:["China Drink","China"],size:data[0]['China Drink China']}];
//------------------ End -----------------------------------------			
/*			
var sets=[ {sets: ["Branded"], size:41},
			{sets:["Premium"],size:11},
			{sets:["Private Label"],size:6},
			{sets:["Branded","Premium"],size:14},
			{sets:["Branded","Private Label"],size:3},
			{sets:[keyValue[0].B,keyValue[0].C],size:keyValue[0].BCvalue},
			{sets:[keyValue[0].A,keyValue[0].B,keyValue[0].C],size:keyValue[0].ABCvalue}];

*/
var chart = venn.VennDiagram();



d3.select(this.domNode).datum(sets).call(chart);




            }
        }
    );
}());