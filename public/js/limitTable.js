function drawLimitTable(){

    limitTableGroup =  d3.select("#mainSvg")
    .append("g")
    .attr("class","barChartGroup")
    .attr("transform","translate(35,50)");

    if(gameType == "noGame"){
        limitTableGroup.attr("transform","translate(35,100)");
    }

    var limitColLabel = limitTableGroup.selectAll(".limitColLabel")
                        .data(limitLabels)
                        .enter()
                        .append("text")
                        .attr("x",function(d,i){
                            return i * (moleculeRadius * 4) + (moleculeRadius *2);
                        })
                        .attr("y","-15")
                        .attr("dx","2")
                        .attr("fill","white")
                        .attr("text-anchor","middle")
                        .attr("font-size","15px")
                        .text(function(d){
                            return d;
                        });
    
    
    var limitTableMoleculeG = limitTableGroup.selectAll(".limitTableCircles")
                                .data(moleculeType)
                                .enter()
                                .append("g")
                                .attr("transform",function(d,i){
                                    return "translate("+(35) + "," + (i * (moleculeRadius * 2.5 ) + (moleculeRadius/2)) + ")";
                                });
    
    var limitTableMolCirles = limitTableMoleculeG
                                .append("circle")
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
    
    var limitTableMolLabel = limitTableMoleculeG
                            .append("text")
                            .attr("class",function(d,i){
                                return "limitTableMolLabel limitTableMolLabel_" + i;
                            })
                            .attr("x", function (d) { return (moleculeRadius/2); })
                            .attr("y", function (d) { return (moleculeRadius/2); })
                            .attr("dy",molecule_font_dy)
                            .attr("fill","white")
                            .attr("text-anchor","middle")
                            .attr("font-size",molecule_font_size)
                            .text(function(d){
                                return d.type;
                            });
    
    var limitMaxNumbers = limitTableMoleculeG
                                .append("text")
                                .attr("class",function(d,i){
                                    return "limitMaxNumbers limitMaxNumbers_"+i;
                                })
                                .attr("x", function (d) { return (moleculeRadius * 4); })
                                .attr("y", function (d) { return (moleculeRadius/2); })
                                .attr("dx","10px")
                                .attr("dy",molecule_font_dy)
                                .attr("fill","white")
                                .attr("text-anchor","middle")
                                .attr("font-size",limitTableTextSize)
    
    var limitUsedNumbers = limitTableMoleculeG
                                .append("text")
                                .attr("class",function(d,i){
                                    return "limitUsedNumbers limitUsedNumbers_"+i;
                                })
                                .attr("x", function (d) { return (moleculeRadius * 9); })
                                .attr("y", function (d) { return (moleculeRadius/2); })
                                .attr("dx","-10px")
                                .attr("dy",molecule_font_dy)
                                .attr("fill","white")
                                .attr("stroke","none")
                                .attr("text-anchor","middle")
                                .attr("font-size",limitTableTextSize)
}

function highlightLimitTableMax(elementIndex){

    var t = d3.transition()
    .duration(500)
    .ease(d3.easeLinear);

    d3.select(".limitUsedNumbers_" + elementIndex)
    .transition(t)
    .attr("stroke","red")
    .attr("font-size",limitTableTextSize * 2 )
    .transition(t)
    .attr("font-size",limitTableTextSize )
    .attr("stroke","none")

}

function updateUsedMoleculesArrays(){
    usedIons[0] = 0;
    usedIons[1] = 0;
    usedIons[2] = 0;

    d3.selectAll(".molGroup").each(function(d,i){
        var currentIndex = d.elementIndex;
        
        usedIons[currentIndex] = Number(usedIons[currentIndex]) + 1;
    });
}

function updatedUsedMoleculesNumber(){
	d3.selectAll(".limitUsedNumbers")
	.text(function(d,i){
        return usedIons[""+i];
    });
}

function updatedMaxMoleculesNumber(){
	d3.selectAll(".limitMaxNumbers")
	.text(function(d){
    	if(d.type == "Li")
    		return maxIons["0"];
    	if(d.type == "Co")
    		return maxIons["1"];
    	if(d.type == "Ni")
    		return maxIons["2"];
    });
}

//check for the exact number of molecules
function checkforMoleculeNumbers(){
    
	var checkCondition = true;
	if(minLi != -1){
		
		if(usedIons["0"] == minLi){
			checkCondition = true;
		}
		else{
			return false;
		}
	}
	
	if(minNi != -1){
		if(usedIons["2"] == minNi){
			checkCondition = true;
		}
		else{
			return false;
		}
	}
	
	if(minCo != -1){
		if(usedIons["1"] == minCo){
			checkCondition = true;
		}
		else{
			return false;
		}
	}
	return checkCondition;
}

function drawEnergyOutput(){
    energyOutputGroup =  d3.select("#mainSvg")
    .append("g")
    .attr("class","energyOutputGroup")
    .attr("transform","translate(160,350)");

    energyOutputGroup
    .append("text")
    .attr("x","0")
    .attr("y","0")
    .attr("dx","2")
    .attr("fill","white")
    .attr("text-anchor","middle")
    .attr("font-size","22px")
    .text(function(d){
        return "Current Energy (ev):";
    });

    var energyOutputLabel = energyOutputGroup
    .append("text")
    .attr("class","energyOutputLabel")
    .attr("x","0")
    .attr("y","25")
    .attr("dx","2")
    .attr("fill","white")
    .attr("text-anchor","middle")
    .attr("font-size","18px")
    .text(function(d){
        return Number(energyvalue).toFixed(2);
    });
}

function updateEnergyOutput(){
    d3.select(".energyOutputLabel").text(function(d){
        return energyvalue.toFixed(2);
    });
}
