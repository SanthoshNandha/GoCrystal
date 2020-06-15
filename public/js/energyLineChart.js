var energyHistory = [];
var barChartGroup;

var circle_radius = 5;
	
// set the dimensions and margins of the graph	
var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 500 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;


var x = d3.scaleBand()
    .domain([-9,-8,-7,-6,-5,-4,-3,-2,-1,0])
    .range([0, width]);
// set the ranges
//var x = d3.scaleBand().range([0, width]).domain([0,1,2,3,4]).padding(-0.1);
var y = d3.scaleLinear().range([height, 0]).domain([-1000,13000]);

var xAxis = d3.axisBottom().scale(x)
var yAxis = d3.axisLeft().scale(y)

// define the line
var valueline = d3.line()
	.x(function(d, i) {			
		return x(i-9) + (x.bandwidth()/2); 
	})
	.y(function(d) { return y(d.energy); });

function drawLineChart(energy, arrangement){
	
	/* for(var i=0; i <10; i++){
		var energyHistoryObj = {};	
		energyHistoryObj["energy"] = energy;
		energyHistoryObj["arrangement"] = arrangement.slice(0);
		energyHistory.push(energyHistoryObj);
	} */

	var energyHistoryObj = {};	
		energyHistoryObj["energy"] = energy;
		energyHistoryObj["arrangement"] = arrangement.slice(0);
		energyHistory.push(energyHistoryObj);

	
	barChartGroup =  d3.select("#mainSvg")
  					 .append("g")
  					 .attr("class","barChartGroup")
  					 .attr("transform","translate(325,580)");		 
	
	// add the x Axis
	barChartGroup.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	barChartGroup.append("text")             
		.attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
		.style("text-anchor", "middle")
		.text("Last 10 Energies");
		
	// add the y Axis
	barChartGroup.append("g")
		.call(d3.axisLeft(y));

	 // Add the valueline path.
	 barChartGroup.append("path")
	  .attr("class", "energyLine line")
	  .attr("d", valueline(energyHistory));
	  
	barChartGroup.selectAll('.lineCircle')
		.data(energyHistory)
		.enter()
		.append('circle')
		.attr("class","lineCircle")
		.attr('cx', function (d,i) { return x(i - 9) + (x.bandwidth()/2);})
		.attr('cy', function (d) { return y(d.energy) })
		.attr('r', function (d) { return circle_radius })
		.attr('fill', function (d) { return "red" })
		.on("click", historyPointClick);

		d3.selectAll(".lineCircle")
		.attr("stroke","yellow")
		.attr("stroke-width","0px");
	
		d3.select(".lineCircle:last-child")
		.attr("stroke","yellow")
		.attr("stroke-width","1px");
}

function updateEnergyLine(energy, arrangement){
	
	/* for(i=1; i<=9; i++){
		energyHistory[i-1] = energyHistory[i];
	}
	 */
	var energyHistoryObj = {};
	
	energyHistoryObj["energy"] = energy;
	energyHistoryObj["arrangement"] = arrangement.slice(0);	
	energyHistory.push(energyHistoryObj);

	if(energyHistory.length > 10){
		energyHistory.shift();
	}
	
	d3.select(".energyLine")
		.attr("d", valueline(energyHistory));

	d3.selectAll('.lineCircle').remove()

	barChartGroup.selectAll('.lineCircle')
	.data(energyHistory)
	.enter()
	.append('circle')
	.attr("class","lineCircle")
	.attr('cx', function (d,i) { return x(i - 9) + (x.bandwidth()/2);})
	.attr('cy', function (d) { return y(d.energy) })
	.attr('r', function (d) { return circle_radius })
	.attr('fill', function (d) { return "red" })
	.on("click", historyPointClick);
		
	/* d3.selectAll('.lineCircle')
      .data(energyHistory)
      .attr('cx', function (d,i) { return x(i -9) + (x.bandwidth()/2);})
	  .attr('cy', function (d) { return y(d.energy) }); */
	
	d3.selectAll(".lineCircle")
	.attr("stroke","yellow")
	.attr("stroke-width","0px");

	d3.select(".lineCircle:last-child")
	.attr("stroke","yellow")
	.attr("stroke-width","1px");

	
}

function historyPointClick(d,i){

	d3.selectAll(".lineCircle")
	.attr("stroke","yellow")
	.attr("stroke-width","0px");

	d3.select(this)
	.attr("stroke","yellow")
	.attr("stroke-width","1px");

	
	molecules = moleculePlacement_9_8(d.arrangement);
	updateMolecules(molecules);
	
	var ef = obtainEf2(d.arrangement);
	// updateEnergyLine(ef, d.arrangement);
	
	d3.selectAll(".bondlines").remove();
	drawbonds(molecules);

	d3.selectAll(".molGroup").each(function(d,i){

        if(levelActiveAtoms.indexOf(d.id) != -1){
            d.active = true;
        }
        else{
            d.active = false;
        }
    });

	showActiveBonds();
	freezeMolecules(levelActiveAtoms);

	updateUsedMoleculesArrays();
	updatedUsedMoleculesNumber();
}

function resetLinechart(energy, arrangement){
	energyHistory.length = 0;
	updateEnergyLine(energy, arrangement);
}