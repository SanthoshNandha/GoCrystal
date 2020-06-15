function drawGrid(molecules) {

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
					.attr("transform","translate(325,50)");
    	
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
	        .attr("dy",molecule_font_dy)
	        .attr("fill","white")
	        .attr("text-anchor","middle")
	        .attr("font-size",molecule_font_size)
	        .text(function(d){
	        	return d.type;
	        });
	

    
	return obtainEf2(data);
}

function moleculeClick(d,i){

	if(!d3.select(this).classed("freeze")){
		var isChanged = false;
		var currentIndex = d.elementIndex;
		var nextIndex = nextIndexNumber[currentIndex];

		// /* console.log(usedIons[nextIndex]);
		// console.log(maxIons[nextIndex]); */
		// console.log("currentIndex", currentIndex);
		// console.log("nextIndex", nextIndex);

		if (Number(usedIons[nextIndex]) <  Number(maxIons[nextIndex])){
			isChanged = true;
		}
		else{
			highlightLimitTableMax(nextIndex);
			nextIndex = nextIndexNumber[nextIndex];
			if (Number(usedIons[nextIndex]) <  Number(maxIons[nextIndex])){
				isChanged = true;
			}
		}

		if(isChanged){
			console.log()
			usedIons[nextIndex] =Number(usedIons[nextIndex]) + 1;
			usedIons[currentIndex] = Number(usedIons[currentIndex]) - 1;

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
			energyvalue = ef;
		
			updateStepUsed(noofmoves);
			
			updatedUsedMoleculesNumber();

			TransitionEnergyBar(ef);

			// updateEnergyOutput();

			energyDifference = previousEnergy - currentEnergy;

			if(gameType != "noGame" ){
				updateScore(energyDifference);
				// TransitionEnergyBar(ef);
			}
			if(gameType == "gameD"){
				updateEnergyLine(ef, data);
				// TransitionEnergyBar(ef);
			}
			if(gameType == "gameM"){
				updateEnergyLine(ef, data);
				highLightEnergyChange(energyDifference, this);
				displayEnergyChange(energyDifference, this);
			}
		}
		else{
			highlightLimitTableMax(nextIndex);
		}
	}
}

function freezeMolecules(activeMolecules){
	d3.selectAll(".molGroup").classed("freeze", true).select(".moleculeCircle").attr("fill","gray");

	for(var i=0; i<activeMolecules.length; i++){
		d3.selectAll(".molGroup_" + activeMolecules[i])
		.classed("freeze", false)
		.select(".moleculeCircle")
		.attr("fill", function (d) { 
			return d.color;
		});
	}
}

function updateScore(energyDifference){
	if(energyDifference > 0){
		level_current_score = level_current_score + 5;
	}
	else if(energyDifference < 0){
		level_current_score = level_current_score - 5;
	}

	$(".scoreStep-div").html(level_current_score);
}

function moleculeRightClick(d,i){

	d3.event.preventDefault();
	d3.event.stopPropagation();

	if(!d3.select(this).classed("freeze")){
		var active = d.active ? false:true
		newOpacity = active ? 1 :0 ;
		
		activeList[Number(d.id) - 1] = active;
		
		d.active = active;
		
		/* d3.select(this).select("circle").attr("stroke",function(d,i){
			return molStroke[newOpacity];
		}) */
		
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
}
   
function drawbonds(molecules){
	var singleBonds = populateSingleBond(molecules);
	drawSingleBond(singleBonds);
	updateSingleBond();

	var Pattern3 = populatePattern3(molecules);
	drawPattern3Bond(Pattern3);
	
	var longDiagonalBonds = populateLongDiagonal(molecules);
	drawlongDiagonalPattern(longDiagonalBonds);
	
	var triangularBonds = populateTrianglePattern(molecules);
	drawTrianglePattern(triangularBonds);
	
	/* d3.selectAll(".bondlines")
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
	}) */
	/* .on("dblclick",function(d,i){
		console.log(d);
		d3.select(this)
		.classed("fixedBond",false)

		if(d3.select(this).classed("singleBond")){
			console.log(d);
			pattern1_classed[(d.molecule1.id - 1)] = false;
			pattern1_classed[(d.molecule2.id - 1)] = false;
		}
		else if(d3.select(this).classed("longBond")){
			pattern3_classed[(d.molecule1.id - 1)] = false;
			pattern3_classed[(d.molecule2.id - 1)] = false;
		}

		else if(d3.select(this).classed("longDiagonalBond")){
			pattern4_classed[(d[0].id - 1)] = false;
			pattern4_classed[(d[1].id - 1)] = false;
		}
	}); */
}

function showActiveBonds(){

	d3.selectAll(".singleBond")
	.attr("display", function(d,i){
		if(levelActiveAtoms.indexOf(d.id1) != -1 && levelActiveAtoms.indexOf(d.id2) != -1){
			return "inline";
		}
		else{
			return "none";
		}
	});

	d3.selectAll(".triangularBond")
	.attr("display", function(d,i){
		if(levelActiveAtoms.indexOf(d[0].id) != -1 && levelActiveAtoms.indexOf(d[1].id) != -1 && levelActiveAtoms.indexOf(d[2].id) != -1){
			return "inline";
		}
		else{
			return "none";
		}
	});

	// d3.selectAll(".molGroup").each(function(d,i){
	// 	if(d.active){
	// 		if($("#patternCheck_2").is(':checked')){
	// 			d3.selectAll(".triangularBond_" + d.id).attr("display","inline");
	// 		}
			
	// 		if($("#patternCheck_1").is(':checked')){
	// 			d3.selectAll(".pattern1Lines_" + d.id).attr("display","inline");
	// 		}
			
	// 		/* if($("#patternCheck_3").is(':checked')){
	// 			d3.selectAll(".pattern3Lines_" + d.id).attr("display","inline");
	// 		}
			
	// 		if($("#patternCheck_4").is(':checked')){
	// 			d3.selectAll(".longDiagonalBond_" + d.id).attr("display","inline");
	// 		} */
	// 	}else{
	// 		if($("#patternCheck_2").is(':checked')){
	// 			d3.selectAll(".triangularBond_" + d.id).attr("display","none");
	// 		}
			
	// 		if($("#patternCheck_1").is(':checked')){
	// 			d3.selectAll(".pattern1Lines_" + d.id).attr("display","none");
	// 		}
			
	// 		/* if($("#patternCheck_3").is(':checked')){
	// 			d3.selectAll(".pattern3Lines_" + d.id).attr("display","none");
	// 		}
			
	// 		if($("#patternCheck_4").is(':checked')){
	// 			d3.selectAll(".longDiagonalBond_" + d.id).attr("display","none");
	// 		} */

	// 	}
	// });
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

	/* var currentStroke = d3.select(changedMolecule).select("circle").attr("stroke");

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
	}); */


}

function displayEnergyChange(energyDifference, changedMolecule){
	
	d3.select(".highlightText").remove();

	var t = d3.transition()
    .duration(450)
	.ease(d3.easeLinear);
	
	var t2 = d3.transition()
    .duration(250)
    .ease(d3.easeLinear);

	d3.select(changedMolecule)
	.insert("text",":first-child")
	.attr("class", "highlightText")
	.attr("x", function (d) { return (moleculeRadius/2); })
	.attr("y", function (d) { return (moleculeRadius/2) - (moleculeRadius/2); })
	.attr("text-anchor","middle")
	.html(function(){

		var absValue = Math.floor(Math.abs(Number(energyDifference)));

		if(energyDifference < 0){
			return "&#8679;" + absValue;
		}
		else if(absValue == 0){
			return "0";
		}
		else{
			return "&#8681;" + absValue;
		}
	})
	.transition(t)
	.attr("y", function (d) { return (moleculeRadius/2) - (moleculeRadius*1.5) ; })
	.transition(t2)
	.remove()
	// d3.select(".highlightText").remove();
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

var bar;

function drawEnergyBar(dataset){

	// set the dimensions and margins of the graph	
	var margin = {top: 20, right: 20, bottom: 20, left: 0},
	width = 125 - margin.left - margin.right,
	height = 525 - margin.top - margin.bottom;

	var energyScale = d3.scaleLinear().range([height, 0]).domain([-1000,13000]);

	// var energyScale = d3.scaleLinear().range([height, 0]).domain([0,12]);

	var energyBarChartGroup =  d3.select("#mainSvg")
  					.append("g")
  					.attr("class","barChartGroup")
					.attr("transform","translate(170,300)");
					   
	
	bar = energyBarChartGroup
	.selectAll("bar")
	.data(dataset)
	.enter()
	.append("rect")
	.style("fill", "steelblue")
	.attr("x", 10)
	.attr("width", 35)
	.attr("y", function (d) { return energyScale(d) })
	.attr("height", function (d) { 
		return height - energyScale(d); });

	targetbar = energyBarChartGroup.selectAll("bar")
	.data(dataset)
	.enter().append("rect")
	.style("fill", "white")
	.attr("x", 0)
	.attr("width", 55)
	.attr("y", function (d) { return energyScale(8.50) })
	.attr("height", 1.5);

	energyBarChartGroup.append("line")
	.attr("x1", 0)
	.attr("y1", height)
	.attr("x2", 55)
	.attr("y2", height)
	.attr("class", "line");


	energyBarChartGroup.append("text")
	.attr("transform","translate(" + (width/4) + " ," + (height + margin.top) + ")")
	.style("text-anchor", "middle")
	.text("Energy");
	/* .attr("x", 10) //width/2
	.attr("y", 0 - 17) //margin.top/2 - (40 / 2)
	.attr("text-anchor", "middle")
	.style("font-size", "16px") */
	

	/* energyBarChartGroup.append("text")
		.attr("class","energyValueText")
		.attr("x","14px")
		.attr("dx","-1px")
		.attr("dy","-0.5px")
		.style("font-size","6px"); */

		yAxisE = d3.axisLeft(energyScale);


		yAxisEnergy = energyBarChartGroup.append('g')
						.classed('y axis', true)
						.call(yAxisE);


		//energy text
		var yeText = yAxisEnergy.append('text')
		.attr('transform', 'rotate(-90)translate(-' + 125 + ',-10)')
		.style('text-anchor', 'middle')
		.style('fill', 'white')
		.attr('dy', '-2.5em')
		.style('font-size', 14)
		.text('eV');

		energyBarChartGroup.append("text")
		.attr("class","energyValueText")
		.attr("x","12.5px")
		.attr("y", energyScale(dataset[0]))
		.attr("dx","-1.5px")
		.attr("dy","-0.75px")
		.style("font-size","8px")
		.text(Number(dataset[0]).toFixed(2));
}

function TransitionEnergyBar(ef) {

	var margin = {top: 20, right: 20, bottom: 20, left: 0},
	width = 125 - margin.left - margin.right,
	height = 525 - margin.top - margin.bottom;

	var energyScale = d3.scaleLinear().range([height, 0]).domain([-1000,13000]);

	// var energyScale = d3.scaleLinear().range([height, 0]).domain([0,12]);

    bar.transition()
    .duration(300)
    .attr("y", energyScale(ef))
    .attr("height", height - energyScale(ef));
    
    d3.selectAll(".energyValueText")
    	.transition()
    	.duration(300)
    	.attr("y", energyScale(ef))
    	.text(Number(ef).toFixed(2));
    
    if(ef < 0){
    	d3.select(".energyValueText")
    		.attr("dx","-2px");
    }
    else{
    	d3.select(".energyValueText")
			.attr("dx","-2px");
    }
}

function drawInstruction(instruction){
	var instructionGroup =  d3.select("#mainSvg")
  					 .append("g")
  					 .attr("class","barChartGroup")
					.attr("transform","translate(795,580)");

	

					instructionGroup.append("foreignObject")
					.attr("x",0)
					.attr("y",0)
					.attr("width", 250)
					.attr("height", 230)
					.attr("stroke","white")
					.attr("stroke-width","1.5")
					.append("xhtml:div")
					.attr("class","instrcDiv")
					.append("xhtml:p")
					.html(instruction)

					if(gameType == "noGame" /* || gameType == "gameM" */ ){
						instructionGroup.attr("transform","translate(325,580)");
						d3.select("foreignObject").attr("width", 650);
					}
	
}

function updateInstruction(instruction){
	d3.select(".instrcDiv").select('p').html(instruction);
}

function updateStepUsed(noofmoves){
	$(".usedStep-div").text(noofmoves);
}
