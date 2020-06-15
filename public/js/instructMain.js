var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function alertMessage(message){
	alert("Update FAILED !!! \n" + message);
}
$( document ).ready(function() {
	
	 $('#level').change(function(){
		 
		 var selectedLevel =  $(this).val();
		 if(selectedLevel == 0){
			 $("#levelDescriptionGroup, #targetEnergyGroup, #maxStepsGroup, #maxTimeGroup, #maxLiGroup, #maxNiGroup, " +
			 		"#maxCoGroup, #minLiGroup, #minNiGroup, #minCoGroup, #considerStepsGroup").hide();
			 
			 d3.select(".targetLine").style("display","none");
		 }
		 else{
			 $("#levelDescriptionGroup, #targetEnergyGroup, #maxStepsGroup, #maxTimeGroup, #maxLiGroup, #maxNiGroup, " +
		 		"#maxCoGroup, #minLiGroup, #minNiGroup, #minCoGroup, #considerStepsGroup").show();
			 
			 d3.select(".targetLine").style("display","inline");
		 }
		 
		 updateValues(selectedLevel);
	 });
	
	$("#targetEnergy").change(function(){
		var targetEnergy = Number($(this).val());
		transitionTargetLine(targetEnergy);
	});
	
	$("#updateConfig").click(function(){
		var flag = true;
		 var level=$("#level").val();
		 if(level == 0){
			 var moleculePattern = shapes;
			 var moleculePattern2 = shapesindiv2;
			 var maxFreq = $("#maxFrequency").val();
			 var initialEnergy = $("#InitialEnergy").val();
			 var maxSwapInterval = $("#maxInterval").val();
		 }
		 else{
			 var levelDescription = $("#levelDescription").val();
			 var moleculePattern = shapes;
			 var moleculePattern2 = shapesindiv2;
			 var targetEnergy = $("#targetEnergy").val();
			 var maxSteps = $("#maxSteps").val();
			 var maxTime = $("#maxTime").val();
			 var minSwap = $("#minSwap").val();
			 var maxSwap = $("#maxSwap").val();
			 var maxLi = $("#maxLi").val();
			 var maxNi = $("#maxNi").val();
			 var maxCo = $("#maxCo").val();
			 var minLi = $("#minLi").val();
			 var minNi = $("#minNi").val();
			 var minCo = $("#minCo").val();
			 var maxSwapInterval = $("#maxInterval").val();
			 var maxFreq = $("#maxFrequency").val();
			 var considerSteps = $("#considerSteps").val();
			 var initialEnergy = $("#InitialEnergy").val();
			 
			 if(targetEnergy == "null" || targetEnergy == ""){
				 flag = false;
				 alertMessage("Target Enegry is required");
			 }
			 if(Number(targetEnergy) >= Number(initialEnergy)){
				 flag = false;
				 alertMessage("Target energy should be less than Initial Energy");
			 }
			 if(maxSteps == "" || maxSteps == " ") maxSteps = 100;
			 if(maxTime == "" || maxTime == " ") maxTime = 100;
			 
			 if(minSwap == "" || minSwap == " ") minSwap = 10000;
			 if(maxSwap == "" || maxSwap == " ") maxSwap = 20000;
			 
			 if(Number(maxLi) <= -1) maxLi = 16;
			 if(Number(maxNi) <= -1) maxNi = 16;
			 if(Number(maxCo) <= -1) maxCo = 16;
			 
			 if((Number(maxLi) + Number(maxNi) + Number(maxCo)) <= 32){
				 flag = false;
				 alertMessage("Sum of Maximum Li, Maximum Ni & Maximum Co should be greater than 32");
			 } 
			 
			 if(Number(maxSwap) <= Number(minSwap)){
				 flag = false;
				 alertMessage("Maximum Swap Duration should be greater than Minimum Swap Duration");
			 }
		 }
		 
		 if(flag){
			 $.post('/updateConfig', {
					"level": level, 
					"levelDescription":levelDescription,
					"moleculePattern" : moleculePattern.concat(moleculePattern2),
					"targetEnergy": targetEnergy, 
					"maxSteps" : maxSteps,
					"maxTime": maxTime, 
					"maxLi":maxLi,
					"maxNi":maxNi,
					"maxCo":maxCo,
					"minLi":minLi,
					"minNi":minNi,
					"minCo":minCo,
					"minSwap" : minSwap,
					"maxSwap": maxSwap, 
					"considerSteps" : considerSteps,
					"maxSwapInterval" : maxSwapInterval,
					"maxFreq":maxFreq
				}, 
				function(returnedData){
					alert("Updated Successfully");
				}).fail(function(){
					alert("Updated falied!! Please try again");
				});		 
		 	}
	  });
	
	d3.json("json/gameJson.json",function(gameJson){
		var totalLevel = gameJson.levels;
		for(var i=1; i<=totalLevel; i++){
			 $('#level')
	         	.append($("<option></option>")
                .attr("value",i)
                .text(i));
		}
		 $('#level')
      		.append($("<option></option>")
      		.attr("value",0)
      		.text("Scratch Mode"));
		
		var selectedLevel =  $('#level').val();
		startView();
		updateValues(selectedLevel);		
	});
});

function updateValues(userSelectedLevel){	
	$.get('/getLevelConfig/'+userSelectedLevel,function(configData){
		if(configData != null && configData.length > 0){
			 $("#levelDescription").val(configData[0].levelDescription);
			 $("#targetEnergy").val(parseFloat(Number(configData[0].targetenergy)).toFixed(2));
			 $("#maxSteps").val(Number(configData[0].maxsteps));
			 $("#maxTime").val(Number(configData[0].gametime));
			 $("#minSwap").val(Number(configData[0].minSwapDuration));
			 $("#maxSwap").val(Number(configData[0].maxSwapDuration));
			 $("#maxLi").val(Number(configData[0].maxLi));
			 $("#maxNi").val(Number(configData[0].maxNi));
			 $("#maxCo").val(Number(configData[0].maxCo));
			 $("#minLi").val(Number(configData[0].minLi));
			 $("#minNi").val(Number(configData[0].minNi));
			 $("#minCo").val(Number(configData[0].minCo));
			 $("#maxInterval").val(Number(configData[0].maxSwapInterval));
			 $("#maxFrequency").val(Number(configData[0].maxFreq));
			 
			 if(configData[0].considersteps){
				 $("#considerSteps").val("true");	
			 }
			 else{
				 $("#considerSteps").val("false");
			 }
			 
	        for (var i = 0; i < configData[0].children.length; i++) {
	            var idss = configData[0].children[i].id;
	            if (idss <= 16) {
	                for (var j = 0; j < shapes.length; j++) {
	                    if (shapes[j].id == idss) {
	                        shapes[j].type = configData[0].children[i].type;
	                        if (shapes[j].type == "Li") {
	                            shapes[j].fill = "green";
	                            shapes[j].color = "green";
	                            shapes[j].e = 0;
	                        }
	                        else if (shapes[j].type == "Ni") {
	                            shapes[j].fill = "red";
	                            shapes[j].color = "red";
	                            shapes[j].e = -1;
	                        }
	                        else {
	                            shapes[j].fill = "blue";
	                            shapes[j].color = "blue";
	                            shapes[j].e = 1;
	                        }
	                        break;
	                    }
	                }
	            }
	            else {
	                for (var j = 0; j < shapesindiv2.length; j++) {
	                    if (shapesindiv2[j].id == idss) {
	                        shapesindiv2[j].type = configData[0].children[i].type;
	                        if (shapesindiv2[j].type == "Li") {
	                            shapesindiv2[j].fill = "green";
	                            shapesindiv2[j].color = "green";
	                            shapesindiv2[j].e = 0;
	                        }
	                        else if (shapesindiv2[j].type == "Ni") {
	                            shapesindiv2[j].fill = "red";
	                            shapesindiv2[j].color = "red";
	                            shapesindiv2[j].e = -1;
	                        }
	                        else {
	                            shapesindiv2[j].fill = "blue";
	                            shapesindiv2[j].color = "blue";
	                            shapesindiv2[j].e = 1;
	                        }
	                        break;
	                    }
	                }
	            }
	        }
	        
	        d3.selectAll(".molGroup")
	        	.select("circle")
	        	.attr("fill", function (d) { 
	      	  	return d.color;
	        });
	        
	        d3.selectAll(".molGroup")
	    	.select("text")
	    	.text(function(d){
	        	return d.type;
	        }); 
			updatedata();
			var ef = obtainEf2(data);        
	        $("#InitialEnergy").val(ef);
	        TransitionEnergyBar(ef); 
	        transitionTargetLine(parseFloat(Number(configData[0].targetenergy)).toFixed(2));
		}
	});	
	
}

function startView() {
	
    shapes = atomPlacement();
    shapesindiv2 = atomPlacementindiv2();

    div = document.getElementById("div1");

	svg = d3.select("#div1")
			.append("svg")
			.attr("class","molecule-view-svg")
			.attr("viewBox","0 0 " + moleculeSVG_Width + " " +  moleculeSVG_Height)
			.attr("preserveAspectRatio","xMinYMin meet")
			.style("width","80%")
			.append("g")
			.attr("class","svgG")
			.attr("transform","translate(30,30)");
        	
	svg2 = d3.select("#div2")
        	.append("svg")
        	.attr("class","molecule-view-svg")
        	.attr("viewBox","0 0 " + moleculeSVG_Width + " " +  moleculeSVG_Height)
			.attr("preserveAspectRatio","xMinYMin meet")
			.style("width","80%")
        	.append("g")
			.attr("class","svg2G")
			.attr("transform","translate(30,30)");

	svg3 = d3.select("#div3").append("svg")
		.attr("viewBox","0 0 " + 350 + " " +  250)
		.attr("preserveAspectRatio","xMidYMin slice")
		.style("width","80%")
		.append('g')
    	.attr('transform', 'translate(' + 50 + ',' + 30 + ')');

    svg4 = svg3.append('g')
     .attr('transform', 'translate(' + 50 + ',' + 0 + ')');

    energyScale = d3.scaleLinear()
				   .domain([-3, 3])
				   .range([200, 0])
				   .nice();
    
    yAxisE = d3.axisLeft(energyScale);

    yAxisEnergy = svg4.append('g')
    				.classed('y axis', true)
    				.call(yAxisE);

    //energy text
    var yeText = yAxisEnergy.append('text')
    .attr('transform', 'rotate(-90)translate(-' + 200 / 2 + ',0)')
    .style('text-anchor', 'middle')
    .style('fill', 'white')
    .attr('dy', '-2.5em')
    .style('font-size', 14)
    .text('eV');

    //enrgy bar
    bar = svg4
	   .append("rect")
	   .style("fill", "steelblue")
	   .attr("x", 10)
	   .attr("width", 20);

    svg4.append("line")
	    .attr("x1", 0)
	    .attr("y1", 200)
	    .attr("x2", 40)
	    .attr("y2", 200)
	    .attr("class", "line");


    svg4.append("text")
		 .attr("x", 10) //width/2
		 .attr("y", 0 - 17) //margin.top/2 - (40 / 2)
		 .attr("text-anchor", "middle")
		 .style("font-size", "16px")
		 .text("Energy");
    
    svg4.append("line")
    	.attr("class","targetLine line")
    	.attr("x1",0)
    	.attr("x2",40)
    	.style("stroke-width","1.5px");
    
    svg4.append("text")
	.attr("class","energyValueText")
	.attr("x","14px")
	.attr("dx","-1px")
	.attr("dy","-0.5px")
	.style("font-size","6px");
    
    

	circlefdiv =  svg.selectAll("g")
		            .data(shapes)
		            .enter()
		            .append("g")
		            .attr("class","molGroup")
		            .on("click", ChangeAtomindiv1)
		            .attr("transform",function(d){
		            	return "translate("+(d.x - (moleculeRadius/2)) + "," + (d.y - (moleculeRadius/2)) + ")";
		            });
			
	circlefdiv.append("circle")
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
        
	circlefdiv
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
					        
        				
    // draw atom in second division
	circlesdiv	= svg2.selectAll("g")
		            .data(shapesindiv2)
		            .enter()
		            .append("g")
		            .attr("class","molGroup")
		            .on("click", ChangeAtomindiv2)
		            .attr("transform",function(d){
		            	return "translate("+(d.x - (moleculeRadius/2)) + "," + (d.y - (moleculeRadius/2)) + ")";
		            });
        	
	circlesdiv
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

	circlesdiv
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
}



// update the data array so that after swap and click issue is resolved
function updatedata() {
    var z = 0;
    for (var i = 0; i < shapes.length; i++) {
        data[z] = shapes[i].e;
        z = z + 1;
    }
    for (var j = 0; j < shapesindiv2.length; j++) {
        data[z] = shapesindiv2[j].e;
        z = z + 1;
    }
}

//  change atom in div1 and update the energy. onclick event for atom in div1
//params d,i to get index of atom
// yellow ,0 --> Li
// gray,-1 -->Ni
// blue,1 -->Co
function ChangeAtomindiv1(d, i) {

    if (d.type == "Li") {
        d3.select(this).selectAll("circle").attr("fill", "red");
        
        for (var z = 0; z < shapes.length; z++) {
            if (d.id == shapes[z].id) {
            	shapes[z].color = "red";
                shapes[z].type = "Ni";
                shapes[z].e = -1;
                shapes[z].fill = "gray";
                energy = -1;
                break;
            }
        }

    }
    else if (d.type == "Ni") {
        d3.select(this).selectAll("circle").attr("fill", "blue");
        for (var z = 0; z < shapes.length; z++) {
            if (d.id == shapes[z].id) {
            	shapes[z].color = "blue";
            	shapes[z].type = "Co";
                shapes[z].e = 1;
                shapes[z].fill = "blue";
                energy = 1;
                break;
            }
        }
    }
    else if (d.type == "Co") {
        d3.select(this).selectAll("circle").attr("fill", "green");
        for (var z = 0; z < shapes.length; z++) {
            if (d.id == shapes[z].id) {
            	shapes[z].color = "green";
            	shapes[z].type = "Li";
                shapes[z].e = 0;
                shapes[z].fill = "yellow";
                energy = 0;
                break;
            }
        }
    }
    
    d3.select(this).selectAll("text")
    .text(function(d){
    	return d.type;
    });
    
    var q = d.id;
    data[q - 1] = energy; //update data and caluclate energy

    ef = obtainEf2(data);

    TransitionEnergyBar(ef);
    $("#InitialEnergy").val(ef);
}

// change atom in div2 and update the energy
function ChangeAtomindiv2(d, i) {
    if (d.type == "Li") {
        d3.select(this).selectAll("circle").attr("fill", "red");
        for (var z = 0; z < shapesindiv2.length; z++) {
            if (d.id == shapesindiv2[z].id) {
                shapesindiv2[z].type = "Ni";
                shapesindiv2[z].e = -1;
                shapesindiv2[z].fill = "red";
                shapesindiv2[z].color = "red";
                energy = -1;
                break;
            }
        }

    }
    else if (d.type == "Ni") {
        d3.select(this).selectAll("circle").attr("fill", "blue");
        for (var z = 0; z < shapesindiv2.length; z++) {
            if (d.id == shapesindiv2[z].id) {
                shapesindiv2[z].type = "Co";
                shapesindiv2[z].e = 1;
                shapesindiv2[z].fill = "blue";
                shapesindiv2[z].color = "blue";
                energy = 1;
                break;
            }
        }
    }
    else if (d.type == "Co") {
        d3.select(this).selectAll("circle").attr("fill", "green");
        for (var z = 0; z < shapesindiv2.length; z++) {
            if (d.id == shapesindiv2[z].id) {
                shapesindiv2[z].type = "Li";
                shapesindiv2[z].e = 0;
                shapesindiv2[z].fill = "green";
                shapesindiv2[z].color = "green";
                energy = 0;
                break;
            }
        }
    }
    
    d3.select(this).selectAll("text")
    	.text(function(d){
    		return d.type;
    	});
    
    var s = d.id;
    data[s - 1] = energy;
    //  updatedata();
    // calulate energy depending on the updated data value and change energy bar
    ef = obtainEf2(data);

    TransitionEnergyBar(ef);
    $("#InitialEnergy").val(ef);
}

// transition energy bar depending on energy caluclated
// params -- ef -- energy value
function TransitionEnergyBar(ef) {
    bar.transition()
    .duration(300)
    .attr("y", energyScale(ef))
    .attr("height", 200 - energyScale(ef));
    
    d3.select(".energyValueText")
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
			.attr("dx","0px");
	}
}

function transitionTargetLine(targetValue){
	var y = energyScale(targetValue);
	d3.select(".targetLine")
		.attr("y1",y)
		.attr("y2",y);
}