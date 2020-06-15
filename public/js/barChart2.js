function drawBarChartLong(){

	var barChartData = [
		
		{ "Pattern": "1", "combination" : "Li_Li ", "energy":0.051, "mol1":"Li", "mol2":"Li"},
		{ "Pattern": "1", "combination" : "Li_Co ", "energy":-0.053, "mol1":"Li", "mol2":"Co"},
		{ "Pattern": "1", "combination" : "Li_Ni ", "energy":0.002, "mol1":"Li", "mol2":"Ni"},
		{ "Pattern": "1", "combination" : "Co_Co ", "energy":0.184, "mol1":"Co", "mol2":"Co"},
		{ "Pattern": "1", "combination" : "Co_Ni ", "energy":-0.132, "mol1":"Co", "mol2":"Ni"},
		{ "Pattern":"1", "combination" : "Ni_Ni ", "energy":0.130, "mol1":"Ni", "mol2":"Ni"}
	];
	
	barChartData.sort(function(a, b){
	    return a["energy"]-b["energy"];
	});

	
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 350 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	
	var y = d3.scaleLinear()
	          .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)

var yAxis = d3.axisLeft()
    .scale(y)

x.domain(barChartData.map(function(d) { return d.combination; }));
// y.domain([(d3.min(barChartData, function(d) { return d.energy; })) - 0.1, d3.max(barChartData, function(d) { return d.energy; })]);
y.domain([-1.4, 1.1]);

var barChartGroup =  d3.select("#mainSvg")
  					 .append("g")
  					 .attr("class","barChartGroup")
  					 .attr("transform","translate(1150,450)");

// add the x Axis
barChartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

barChartGroup.append("text")             
.attr("transform",
      "translate(" + (width/2) + " ," + 
                     (height + margin.top + 20) + ")")
.style("text-anchor", "middle")
.text("Long");

// add the y Axis
barChartGroup.append("g")
    .call(d3.axisLeft(y));

//text label for the y axis
barChartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left)
   .attr("x",0 - (height / 2))
   .attr("dy", "-2px")
   .style("text-anchor", "middle")
   .text("Energy");

//append the rectangles for the bar chart
barChartGroup.selectAll(".bar")
   .data(barChartData)
   .enter().append("rect")
   .attr("class", function(d,i){
	   return "bar bar_long " + "bar_long_" + d.mol1 + "_" + d.mol2 + " bar_long_" + d.mol2 + "_" + d.mol1 ;
   })
   .attr("x", function(d) { return x(d.combination); })
   .attr("width", x.bandwidth())
   .attr("y", function(d) { return y(d.energy); })
   .attr("height", function(d) { return height - y(d.energy); });
}

