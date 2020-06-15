function drawBarChartTriangle(){

	var barChartData = [
		
		{ "Pattern": "1", "combination" : "Li_Li_Li ", "energy":0.001, "mol1":"Li", "mol2":"Li", "mol3":"Li"},
		{ "Pattern": "1", "combination" : "Li_Li_Co ", "energy":-0.043, "mol1":"Li", "mol2":"Li", "mol3":"Co"},
		{ "Pattern": "1", "combination" : "Li_Li_Ni ", "energy":0.042, "mol1":"Li", "mol2":"Li", "mol3":"Ni"},
		
		{ "Pattern": "1", "combination" : "Li_Co_Co ", "energy":0.035, "mol1":"Li", "mol2":"Co", "mol3":"Co"},
		{ "Pattern": "1", "combination" : "Li_Co_Ni ", "energy":0.008, "mol1":"Li", "mol2":"Co", "mol3":"Ni"},
		
		{ "Pattern": "1", "combination" : "Li_Ni_Ni", "energy":-0.051, "mol1":"Li", "mol2":"Ni", "mol3":"Ni"},
		
		{ "Pattern": "1", "combination" : "Co_Co_Co", "energy":0.038, "mol1":"Co", "mol2":"Co", "mol3":"Co"},
		{ "Pattern": "1", "combination" : "Co_Co_Ni", "energy":-0.073, "mol1":"Co", "mol2":"Co", "mol3":"Ni"},
		
		{ "Pattern": "1", "combination" : "Co_Ni_Ni", "energy":0.064, "mol1":"Co", "mol2":"Ni", "mol3":"Ni"},
		
		{ "Pattern":"1", "combination" : "Ni_Ni_Ni", "energy":-0.013, "mol1":"Ni", "mol2":"Ni", "mol3":"Ni"},
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
  					 .attr("transform","translate(1530,0)");

// add the x Axis
barChartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

barChartGroup.append("text")             
.attr("transform",
      "translate(" + (width/2) + " ," + 
                     (height + margin.top + 50) + ")")
.style("text-anchor", "middle")
.text("Triangle");

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
	   return "bar bar_triangle " + "bar_triangle_" + d.mol1 + "_" + d.mol2 + "_" + d.mol3 + " bar_triangle_" + d.mol2 + "_" + 
	   	d.mol3 + "_" + d.mol1 + " bar_triangle_" + d.mol3 + "_" + d.mol1 + "_" + d.mol2 ;
   })
   .attr("x", function(d) { return x(d.combination); })
   .attr("width", x.bandwidth())
   .attr("y", function(d) { return y(d.energy); })
   .attr("height", function(d) { return height - y(d.energy); });

}

