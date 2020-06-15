function drawselectionArea(){
	var svg = d3.select(".game-atom-div-0")
	.attr("class","pull-right")
	.style("width","100%")
	.append("svg")        			
	.attr("class","molecule-view-svg pull-right")
	.attr("viewBox","0 0 " + 100 + " " +  0)
	.attr("preserveAspectRatio","xMinYMin slice")
	.style("width","100%")
	.append("g")
	.attr("class","svgG")
	.attr("id","div1Svg")
	.attr("transform","translate(30,30)");
}

