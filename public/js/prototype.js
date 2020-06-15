var data = Array.apply(null, new Array(72)).map(Number.prototype.valueOf,0);
var activeList = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);

var pattern1_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern2_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern3_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern4_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);

var totalSteps = 0;
var previousEnergy = 0;
var currentEnergy = 0;
var molecules = [];

var twoMolBonds  = [
	["-1.115", "0.279", "0.836"],
	["0.279", "1.059", "-1.337"],
	["0.836", "-1.337", "0.501"],
];

var triangularBondEnenrgies = [];

triangularBondEnenrgies[0] = [
[0.001, -0.043, 0.042],
[-0.043, 0.035, 0.008],
[0.042, 0.008, -0.051]	
];

triangularBondEnenrgies[1] = [
[-0.043, 0.035, 0.008],
[0.035, 0.038, -0.073],
[0.008, -0.073, 0.064]
];

triangularBondEnenrgies[2] = [
[0.042, 0.008, -0.051],
[0.008,-0.073, 0.064],
[-0.051, 0.064, -0.013]
];

var moleculesRef = ["0", "li", "co", "ni"];
var moleculesRefNo = { "Li":1, "Co":2, "Ni":3};
var displays = ["none", "inline"];
var molStroke = ["white","magenta"]

$( document ).ready(function() {
	molecules = moleculePlacement_9_8(data);
	currentEnergy = startScratchMode(molecules);
	drawbonds(molecules);
	defineCheckBoxAction();
	drawBarChartSingle();
	drawBarChartLong();
	drawBarChartLongDiagonal();
	drawBarChartTriangle();
	drawLineChart(currentEnergy, data);
});

function startScratchMode(molecules) {

	svg = d3.select("#div1")
			.attr("class","pull-right")
			.style("width","100%")
			.append("svg") 
			.attr("id","mainSvg")
			.attr("class","molecule-view-svg pull-right")
			.attr("viewBox","0 0 " + moleculeSVG_Width + " " +  moleculeSVG_Height)
			.attr("preserveAspectRatio","xMinYMin slice")
			.style("width","100%");
	
	var gridGroup = svg
					.append("g")
					.attr("class","svgG")
					.attr("id","div1Svg")
					.attr("transform","translate(50,50)");
    	
	moleculesGroup =  gridGroup.selectAll("g")
			            .data(molecules)
			            .enter()
			            .append("g")
			            .attr("class",function(d,i){
			            	return "molGroup molGroup_"+d.id
			            })
			            .on("click", moleculeClick)
			            .on("contextmenu", moleculeRightClick)
			            .attr("transform",function(d){
			            	d.transalateX = (100 + (d.x - (moleculeRadius/2)));
			            	d.transalateY = (150 + (d.y - (moleculeRadius/2)));
			            	return "translate("+(d.x - (moleculeRadius/2)) + "," + (d.y - (moleculeRadius/2)) + ")";
			            });
		
	moleculesGroup
              .append("circle")
			  .attr("class","moleculeCircle")
              .attr("cx", function (d) { return (moleculeRadius/2); })
              .attr("cy", function (d) { return (moleculeRadius/2); })
              .attr("r", moleculeRadius)
              .attr("fill", function (d) { 
            	  return d.color;
              })
              .attr("stroke",function(d){
            	 return "white";
              })
              .attr("stroke-width","1px");
    
	moleculesGroup
        	.append("text")
        	.attr("class","moleculeLabel")
	        .attr("x", function (d) { return (moleculeRadius/2); })
	        .attr("y", function (d) { return (moleculeRadius/2); })
	        .attr("dy","3.5px")
	        .attr("fill","white")
	        .attr("text-anchor","middle")
	        .attr("font-size","10px")
	        .text(function(d){
	        	return d.type;
	        });
	

    
	return obtainEf2(data);
}

function moleculeClick(d,i){

	var currentIndex = d.elementIndex;
	var nextIndex = nextIndexNumber[currentIndex];
	
	d.color = colors[nextIndex];
	d.type = labels[nextIndex];
	d.e = moleculeEnergies[nextIndex];
	d.fill = colors[nextIndex];
	d.elementIndex = nextIndex;
	
	d3.select(this).selectAll("circle").attr("fill", colors[nextIndex]);
	
	d3.select(this).selectAll("text")
	    .text(function(d){
	    	return labels[nextIndex];
	    });
	
	updateTriangularPatter(d.id);
	updateSingleBond();
	updatePattern3Bonds(d.id);
	updatelongDiagonalPattern(d.id);
	
	noofmoves++;

	previousEnergy = currentEnergy;

	var q = d.id;
	data[q - 1] = Number(d.e);
	var ef = obtainEf2(data);
	currentEnergy = ef;

	energyDifference = previousEnergy - currentEnergy;
	highLightEnergyChange(energyDifference, this);
	displayEnergyChange(energyDifference, this);
	updateEnergyLine(ef, data);

	updateStepUsed(noofmoves)

}

function moleculeRightClick(d,i){
	
	d3.event.preventDefault();
	d3.event.stopPropagation();
	
	var active = d.active ? false:true
	newOpacity = active ? 1 :0 ;
	
	activeList[Number(d.id) - 1] = active;
	
				
	d.active = active;
	
	d3.select(this).select("circle").attr("stroke",function(d,i){
		return molStroke[newOpacity];
	})
	
	d3.selectAll(".triangularBond_" + d.id).attr("display",function(d,i){
		
		if($("#patternCheck_2").is(':checked')){
			
			if(!d3.select(this).classed("fixedBond")){
				return displays[newOpacity];
			}
			else{
				return "inline";
			}
		}
		else{
			return "none";
		}
	});
	
	d3.selectAll(".pattern1Lines_" + d.id).attr("display",function(d,i){
		if($("#patternCheck_1").is(':checked')){
			if(!d3.select(this).classed("fixedBond")){
				return displays[newOpacity];
			}
			else{
				return "inline";
			}
		}
		else{
			return "none";
		}
		
	});
	
	d3.selectAll(".pattern3Lines_" + d.id).attr("display",function(d,i){
		
		if($("#patternCheck_3").is(':checked')){
			if(!d3.select(this).classed("fixedBond")){
				return displays[newOpacity];
			}
			else{
				return "inline";
			}
		}
		else{
			return "none";
		}
		
	});
	
	d3.selectAll(".longDiagonalBond_" + d.id).attr("display",function(d,i){
		
		if($("#patternCheck_4").is(':checked')){
			if(!d3.select(this).classed("fixedBond")){
				return displays[newOpacity];
			}
			else{
				return "inline";
			}
		}
		else{
			return "none";
		}
	});
		
	showActiveBonds();
}
   
function drawbonds(molecules){
	var singleBonds = populateSingleBond(molecules);
	drawSingleBond(singleBonds);
	
	var Pattern3 = populatePattern3(molecules);
	drawPattern3Bond(Pattern3);
	
	var longDiagonalBonds = populateLongDiagonal(molecules);
	drawlongDiagonalPattern(longDiagonalBonds);
	
	var triangularBonds = populateTrianglePattern(molecules);
	drawTrianglePattern(triangularBonds);
	
	d3.selectAll(".bondlines")
	.on("click",function(d,i){
		d3.select(this)
			.classed("fixedBond",true);

		if(d3.select(this).classed("singleBond")){
			pattern1_classed[(d.molecule1.id - 1)] = true;
			pattern1_classed[(d.molecule2.id - 1)] = true;
		}

		else if(d3.select(this).classed("longBond")){
			pattern3_classed[(d.molecule1.id - 1)] = true;
			pattern3_classed[(d.molecule2.id - 1)] = true;
		}

		else if(d3.select(this).classed("longDiagonalBond")){
			pattern4_classed[(d[0].id - 1)] = true;
			pattern4_classed[(d[1].id - 1)] = true;
		}
	})
	.on("dblclick",function(d,i){
		d3.select(this)
		.classed("fixedBond",false)
		.attr("display",function(d,i){
			if(d.active){
				return "inline";
			}
			else{
				return "none";
			}
		});

		if(d3.select(this).classed("singleBond")){
			console.log(d);
			pattern1_classed[(d.molecule1.id - 1)] = false;
			pattern1_classed[(d.molecule2.id - 1)] = false;
		}
	});
}

function showActiveBonds(){
	d3.selectAll(".molGroup").each(function(d,i){
		if(d.active){
			if($("#patternCheck_2").is(':checked')){
				d3.selectAll(".triangularBond_" + d.id).attr("display","inline");
			}
			
			if($("#patternCheck_1").is(':checked')){
				d3.selectAll(".pattern1Lines_" + d.id).attr("display","inline");
			}
			
			if($("#patternCheck_3").is(':checked')){
				d3.selectAll(".pattern3Lines_" + d.id).attr("display","inline");
			}
			
			if($("#patternCheck_4").is(':checked')){
				d3.selectAll(".longDiagonalBond_" + d.id).attr("display","inline");
			}
		}
	});
}

function updateMolecules(molecules){

	d3.selectAll(".molGroup")
		.data(molecules);
		
	d3.selectAll(".moleculeCircle")
		.data(molecules)
		.attr("fill", function (d) { 
			return d.color;
		});		            
			  	
	d3.selectAll(".moleculeLabel")
		.data(molecules)
		.text(function(d){
				return d.type;
		});
}

function highLightEnergyChange(energyDifference, changedMolecule){

	var currentStroke = d3.select(changedMolecule).select("circle").attr("stroke");

	d3.select(changedMolecule).select("circle")
	.transition()
	.duration(150)
	.attr("stroke-width","3px")
	.attr("stroke",function(d,i){
		if(energyDifference < 0){
			return "Brown";
		}
		return "cyan";
	})
	.transition()
	.duration(150)
	.attr("stroke-width","1px")
	.attr("stroke",function(d,i){
		return currentStroke;
	});


}

function displayEnergyChange(energyDifference, changedMolecule){
	d3.select(changedMolecule)
	.insert("text",":first-child")
	.attr("x", function (d) { return (moleculeRadius/2); })
	.attr("y", function (d) { return (moleculeRadius/2); })
	.attr("text-anchor","middle")
	.html(function(){

		var absValue = Math.floor(Math.abs(Number(energyDifference)));

		if(energyDifference < 0){
			return "&#8681;" + absValue;
		}
		else if(absValue == 0){
			return "0";
		}
		else{
			return "&#8679;" + absValue;
		}
		
		
	})
	.transition()
	.duration(300)
	.attr("y", function (d) { return (moleculeRadius/2) - (moleculeRadius * 1.5) ; })
	.remove()

}

function defineCheckBoxAction(){
	$(".patternCheck").change(function(){
		
		if($("#patternCheck_2").is(':checked')){
			d3.selectAll(".triangularBond").attr("display",function(d,i){
				if(d3.select(this).classed("fixedBond")){
					return "inline";
				}
				else{
					return"none";
				}
			});
		}
		else{
			d3.selectAll(".triangularBond").attr("display","none");
		}
		
		if($("#patternCheck_1").is(':checked')){
			d3.selectAll(".pattern1Div1Lines").attr("display",function(d,i){
				if(d3.select(this).classed("fixedBond")){
					return "inline";
				}
				else{
					return"none";
				}
			});
		}
		else{
			d3.selectAll(".pattern1Div1Lines").attr("display","none");
		}
		
		if($("#patternCheck_3").is(':checked')){
			d3.selectAll(".pattern3Lines").attr("display",function(d,i){
				if(d3.select(this).classed("fixedBond")){
					return "inline";
				}
				else{
					return"none";
				}
			});
		}
		else{
			d3.selectAll(".pattern3Lines").attr("display","none");
		}

		if($("#patternCheck_4").is(':checked')){
			d3.selectAll(".longDiagonalBond").attr("display",function(d,i){
				if(d3.select(this).classed("fixedBond")){
					return "inline";
				}
				else{
					return"none";
				}
			});
		}
		else{
			d3.selectAll(".longDiagonalBond").attr("display","none");
		}
		
		d3.selectAll(".molGroup").each(function(d,i){
			if(d.active){
				if($("#patternCheck_2").is(':checked')){
					d3.selectAll(".triangularBond_" + d.id).attr("display","inline");
				}
				
				if($("#patternCheck_1").is(':checked')){
					d3.selectAll(".pattern1Lines_" + d.id).attr("display","inline");
				}
				
				if($("#patternCheck_3").is(':checked')){
					d3.selectAll(".pattern3Lines_" + d.id).attr("display","inline");
				}
				
				if($("#patternCheck_4").is(':checked')){
					d3.selectAll(".longDiagonalBond_" + d.id).attr("display","inline");
				}
			}
		});
	});
}

function updateStepUsed(noofmoves){
	$(".usedStep-div").text(noofmoves);
}