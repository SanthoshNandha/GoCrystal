var firstcolor = [];
var secondcolor = [];

for (var i = 0; i <= 2; i++) {
    firstcolor.push([]);
    secondcolor.push([]);
}

firstcolor[0][0] = -1.115; firstcolor[0][1] = 0.279; firstcolor[0][2] = 0.836;
firstcolor[1][0] = 0.279; firstcolor[1][1] = 1.059; firstcolor[1][2] = -1.337;
firstcolor[2][0] = 0.836; firstcolor[2][1] = -1.337; firstcolor[2][2] = 0.501;

secondcolor[0][0] = 0.051; secondcolor[0][1] = -0.053; secondcolor[0][2] = 0.002;
secondcolor[1][0] = -0.053; secondcolor[1][1] = 0.184; secondcolor[1][2] = -0.132;
secondcolor[2][0] = 0.002; secondcolor[2][1] = -0.132; secondcolor[2][2] = 0.130;

var pattern1colorScale = d3.scaleLinear().domain([-1.337, 1.059]).range([0.2, 0.8]);
var bondThick = d3.scaleLinear().domain([-0.132, 0.184]).range([2, 4.5]);

var pattern2colorScale = d3.scaleLinear().domain([-0.132, 0.184]).range([0.2, 0.8]); 

// *** SingleBond bond functions ***//

function populateSingleBond(shapes){
	
	var singleBonds = [];
	for (var i = 0; i < shapes.length; i++) {
		
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) != 0){
			//console.log(shapes[i].id);
			if(shapes[i + 1]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 1].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			x2: shapes[i + 1].x, 
	    			y2: shapes[i + 1].y, 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 1]
				});
			}
			if(shapes[i + 9]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 9].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y - 3, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 9].x, 
	    			y2: shapes[i + 9].y, 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 9]
				});
			}
			if(shapes[i + 10]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 10].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 10].x, 
	    			y2: shapes[i + 10].y, 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 10]
				});
			}
		}
		
		if(Math.floor((shapes[i].id/9) % 2) != 0 && (shapes[i].id%9) == 0){
			//console.log(shapes[i].id);
			
			if(shapes[i + 9]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 9].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 9].x, 
	    			y2: shapes[i + 9].y, 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 9]
				});
			}
			
		}
		
		if(Math.floor((shapes[i].id/9) % 2) != 0 && (shapes[i].id%9) != 0){
			if(shapes[i + 1]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 1].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			x2: shapes[i + 1].x, 
	    			y2: shapes[i + 1].y, 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 1]
				});
			}
			if(shapes[i + 9]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 9].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 9].x , 
	    			y2: shapes[i + 9].y , 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 9]
				});
			}
			if(Math.floor((shapes[i].id - 1 ) % 9) != 0){
				if(shapes[i + 8]){
					singleBonds.push({ 
						id1:shapes[i].id,
						id2:shapes[i + 8].id,
		    			x1: shapes[i].x, 
		    			y1: shapes[i].y, 
		    			//type1: patternshapes[i].type, 
		    			x2: shapes[i + 8].x, 
		    			y2: shapes[i + 8].y, 
		    			//type2: patternshapes[i + 7].type 
		    			molecule1:shapes[i],
		    			molecule2:shapes[i + 8]
					});
				}
			}
		}
		
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) == 0){
			if(shapes[i + 9]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 9].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 9].x, 
	    			y2: shapes[i + 9].y, 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 9]
				});
			}
			if(shapes[i + 8]){
				singleBonds.push({ 
					id1:shapes[i].id,
					id2:shapes[i + 8].id,
	    			x1: shapes[i].x, 
	    			y1: shapes[i].y, 
	    			//type1: patternshapes[i].type, 
	    			x2: shapes[i + 8].x, 
	    			y2: shapes[i + 8].y, 
	    			//type2: patternshapes[i + 7].type 
	    			molecule1:shapes[i],
	    			molecule2:shapes[i + 8]
				});
			}
		}
	}
	return singleBonds;
}

function drawSingleBond(bonds){
	d3.select("#div1Svg")
	.selectAll(".pattern1Div1Lines_shadow")
	.data(bonds)
	.enter()
	.insert("line","g")
	.attr("class",function(d,i){
		return "bondlines_shadow pattern1Div1Lines_shadow " + "pattern1Lines_shadow_"+d.id1 + " pattern1Lines_shadow_" + d.id2 
		+ " pattern1Lines_shadow_index" + i;
	})
	.attr("x1", function (d) { return d.x1 })
	.attr("y1", function (d) { return d.y1 })
	.attr("x2", function (d) { return d.x2 })
	.attr("y2", function (d) { return d.y2 })
	.attr("stroke","red")
	.attr("display","none");
	
	d3.select("#div1Svg")
	.selectAll(".pattern1Div1Lines")
	.data(bonds)
	.enter()
	.insert("line","g")
	.attr("class",function(d,i){
		if(pattern1_classed[d.molecule1.id -1] && pattern1_classed[d.molecule2.id -1]){
			return "bondlines singleBond fixedBond pattern1Div1Lines " + "pattern1Lines_"+d.id1 + " pattern1Lines_" + d.id2 + " pattern1Lines_index_" + i;
		}
		return "bondlines singleBond pattern1Div1Lines " + "pattern1Lines_"+d.id1 + " pattern1Lines_" + d.id2 + " pattern1Lines_index_" + i;
	})
	.attr("lineIndex", function(d,i){
		return i;
	})
	.attr("x1", function (d) { return d.x1 })
	.attr("y1", function (d) { return d.y1 })
	.attr("x2", function (d) { return d.x2 })
	.attr("y2", function (d) { return d.y2 })
	.attr("stroke","yellow")
	.attr("display","none")
	.on("mouseover",function(d,i){
		var mol1 = d.molecule1.type;
		var mol2 = d.molecule2.type;
		d3.selectAll(".bar_single_" + mol1 + "_" + mol2).style("fill","red");
		
		d3.select(".pattern1Lines_shadow_index" + i).attr("display","inline");
	})
	.on("mouseout",function(d,i){
		d3.selectAll(".bar_single").style("fill","steelblue");
		d3.select(".pattern1Lines_shadow_index" + i).attr("display","none");
	});
}

function updateSingleBond(){
	d3.selectAll(".pattern1Div1Lines")
		.style("stroke-width",function(d,i){
			 if (d.molecule1.type == "Li" && d.molecule2.type == "Li") {
			     return bondThick(pattern1colorScale(firstcolor[0][0]));
			 }
			 if (d.molecule1.type == "Li" && d.molecule2.type == "Co") {
			     return bondThick(pattern1colorScale(firstcolor[0][1]));
			 }
			 if (d.molecule1.type == "Li" && d.molecule2.type == "Ni") {
			     return bondThick(pattern1colorScale(firstcolor[0][2]));
			 }
			 if (d.molecule1.type == "Co" && d.molecule2.type == "Li") {
			     return bondThick(pattern1colorScale(firstcolor[1][0]));
			 }
			 if (d.molecule1.type == "Co" && d.molecule2.type == "Co") {
			     return bondThick(pattern1colorScale(firstcolor[1][1]));
			 }
			 if (d.molecule1.type == "Co" && d.molecule2.type == "Ni") {
			     return bondThick(pattern1colorScale(firstcolor[1][2]));
			 }
			 if (d.molecule1.type == "Ni" && d.molecule2.type == "Li") {
			     return bondThick(pattern1colorScale(firstcolor[2][0]));
			 }
			 if (d.molecule1.type == "Ni" && d.molecule2.type == "Co") {
			     return bondThick(pattern1colorScale(firstcolor[2][1]));
			 }
			 if (d.molecule1.type == "Ni" && d.molecule2.type == "Ni") {
			         return bondThick(pattern1colorScale(firstcolor[2][2]));
			 }
		});
	
	d3.selectAll(".pattern1Div1Lines_shadow")
	.style("stroke-width",function(d,i){
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Li") {
		     return bondThick(pattern1colorScale(firstcolor[0][0])) + 1;
		 }
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Co") {
		     return bondThick(pattern1colorScale(firstcolor[0][1])) + 1;
		 }
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Ni") {
		     return bondThick(pattern1colorScale(firstcolor[0][2])) + 1;
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Li") {
		     return bondThick(pattern1colorScale(firstcolor[1][0])) + 1;
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Co") {
		     return bondThick(pattern1colorScale(firstcolor[1][1])) + 1 ;
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Ni") {
		     return bondThick(pattern1colorScale(firstcolor[1][2])) + 1;
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Li") {
		     return bondThick(pattern1colorScale(firstcolor[2][0])) + 1;
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Co") {
		     return bondThick(pattern1colorScale(firstcolor[2][1])) + 1;
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Ni") {
		      return bondThick(pattern1colorScale(firstcolor[2][2])) + 1;
		 }
	});
}

// ** Triangular bond functions ** //


var bondLine = d3.line()
						.x(function(d) { return d.x; })
						.y(function(d) { return d.y; });

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

var triangularBondsEnergyScale = d3.scaleLinear().domain([-0.073, 0.073]).range([0.2, 1]);

function populateTrianglePattern(shapes){
	
	var triangleBonds = [];
	for (var i = 0; i < shapes.length; i++) {
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) != 0){
			
			if(shapes[i + 9] && shapes[i + 10]){
				triangleBonds.push([ 
	    			shapes[i],
	    			shapes[i + 9],
					shapes[i + 10],
				]);
			}
			if(shapes[i - 9] && shapes[i - 8]){
				triangleBonds.push([ 
	    			shapes[i],
	    			shapes[i - 9],
					shapes[i - 8],
				]);
			}
		}
		if(Math.floor((shapes[i].id/9) % 2) != 0 && (shapes[i].id%9) != 0){
			if(Math.floor((shapes[i].id - 1 ) % 9) != 0){
				if(shapes[i + 8] && shapes[i + 9]){
					triangleBonds.push([ 
		    			shapes[i],
		    			shapes[i + 8],
						shapes[i + 9],
					]);
				}
				if(shapes[i - 10] && shapes[i - 9]){
					triangleBonds.push([ 
		    			shapes[i],
		    			shapes[i - 10],
						shapes[i - 9],
					]);
				}
			}
		}
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) == 0){
			if(shapes[i + 8] && shapes[i + 9]){
				triangleBonds.push([ 
	    			shapes[i],
	    			shapes[i + 8],
					shapes[i + 9],
				]);
			}
			if(shapes[i - 10] && shapes[i - 9]){
				triangleBonds.push([ 
	    			shapes[i],
	    			shapes[i - 10],
					shapes[i - 9],
				]);
			}
		}
	}
	return triangleBonds;
}

function drawTrianglePattern(bonds){
	
	d3.select("#div1Svg")
	.selectAll(".trianglePattern")
	.data(bonds)
	.enter()
	.insert("g","line")
	.attr("class",function(d,i){
		return " bondlines triangularBond " + "triangularBond_"+d[0].id + " triangularBond_" + d[1].id + " triangularBond_" + d[2].id;
	})
	.attr("stroke","none")
	.attr("fill",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		var index3 = d[2].elementIndex;
		
		return(d3.interpolateRdPu(triangularBondsEnergyScale(triangularBondEnenrgies[index1][index2][index3])));
	})
	.attr("display","none")
	.append("path")
	.datum(function(d){
		return d;
	})
	.attr("d",function(d){
		return bondLine(d) + " Z";
	})
	.on("mouseover",function(d,i){
		var mol1 = d[0].type;
		var mol2 = d[1].type;
		var mol3 = d[2].type;
		d3.selectAll(".bar_triangle_" + mol1 + "_" + mol2 + "_" + mol3).style("fill","red");
		
	})
	.on("mouseout",function(d,i){
		d3.selectAll(".bar_triangle").style("fill","steelblue");
	});
	
}

function updateTriangularPatter(moleculeIndex){
	
	d3.selectAll(".triangularBond_" + moleculeIndex).attr("fill",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		var index3 = d[2].elementIndex;
		return(d3.interpolateRdPu(triangularBondsEnergyScale(triangularBondEnenrgies[index1][index2][index3])));
	});
}

//** Triangular bons functions ends ** //

function populatePattern3(shapes){
	var pattern3Bonds = [];
	
	for (var i = 0; i < shapes.length; i++) {
		if(shapes[i + 18]){
			pattern3Bonds.push({ 
				id1:shapes[i].id,
				id2:shapes[i + 18].id,
    			x1: shapes[i].x, 
    			y1: shapes[i].y, 
    			//type1: patternshapes[i].type, 
    			x2: shapes[i + 18].x, 
    			y2: shapes[i + 18].y, 
    			//type2: patternshapes[i + 7].type 
    			molecule1:shapes[i],
    			molecule2:shapes[i + 18]
			});
		}
		
	}
	return pattern3Bonds;
}

function drawPattern3Bond(bonds){
	d3.select("#div1Svg")
	.selectAll(".pattern3Lines_shadow")
	.data(bonds)
	.enter()
	.insert("line","g")
	.attr("class",function(d,i){
		return "bondlines_shawdow pattern3Lines_shadow " + "pattern3Lines_shadow_"+d.id1 + " pattern3Lines_shadow_" + d.id2 
		+ " pattern3Lines_shadow_index_" + i 
	})
	.attr("x1", function (d) { return d.x1 })
	.attr("y1", function (d) { return d.y1 })
	.attr("x2", function (d) { return d.x2 })
	.attr("y2", function (d) { return d.y2 })
	.attr("stroke","red")
	.attr("display","none")
	
	d3.select("#div1Svg")
	.selectAll(".pattern3Lines")
	.data(bonds)
	.enter()
	.insert("line","g")
	.attr("class",function(d,i){
		if(pattern3_classed[d.molecule1.id -1] && pattern3_classed[d.molecule2.id -1]){
			return "bondlines longBond fixedBond pattern3Lines " + "pattern3Lines_"+d.id1 + " pattern3Lines_" + d.id2;
		}
		return "bondlines longBond pattern3Lines " + "pattern3Lines_"+d.id1 + " pattern3Lines_" + d.id2;
	})
	.attr("x1", function (d) { return d.x1 })
	.attr("y1", function (d) { return d.y1 })
	.attr("x2", function (d) { return d.x2 })
	.attr("y2", function (d) { return d.y2 })
	.attr("stroke","#00FA9A")
	.attr("display","none")
	.on("mouseover",function(d,i){
		var mol1 = d.molecule1.type;
		var mol2 = d.molecule2.type;
		d3.selectAll(".bar_long_" + mol1 + "_" + mol2).style("fill","red");
		
		d3.selectAll(".pattern3Lines_shadow_index_" + i ).attr("display","inline");
	})
	.on("mouseout",function(d,i){
		d3.selectAll(".bar_long").style("fill","steelblue");
		d3.selectAll(".pattern3Lines_shadow_index_" + i ).attr("display","none");
	});
}

function updatePattern3Bonds(moleculeIndex){
	
	d3.selectAll(".pattern3Lines_" + moleculeIndex)
		.style("stroke-width",function(d,i){
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Li") {
		     return bondThick(pattern2colorScale(secondcolor[0][0]));
		 }
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Co") {
		     return bondThick(pattern2colorScale(secondcolor[0][1]));
		 }
		 if (d.molecule1.type == "Li" && d.molecule2.type == "Ni") {
		     return bondThick(pattern2colorScale(secondcolor[0][2]));
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Li") {
		     return bondThick(pattern2colorScale(secondcolor[1][0]));
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Co") {
		     return bondThick(pattern2colorScale(secondcolor[1][1]));
		 }
		 if (d.molecule1.type == "Co" && d.molecule2.type == "Ni") {
		     return bondThick(pattern2colorScale(secondcolor[1][2]));
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Li") {
		     return bondThick(pattern2colorScale(secondcolor[2][0]));
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Co") {
		     return bondThick(pattern2colorScale(secondcolor[2][1]));
		 }
		 if (d.molecule1.type == "Ni" && d.molecule2.type == "Ni") {
		         return bondThick(pattern2colorScale(secondcolor[2][2]));
		 }
	});
	
	d3.selectAll(".pattern3Lines_shadow_" + moleculeIndex)
	.style("stroke-width",function(d,i){
	 if (d.molecule1.type == "Li" && d.molecule2.type == "Li") {
	     return bondThick(pattern2colorScale(secondcolor[0][0])) + 1;
	 }
	 if (d.molecule1.type == "Li" && d.molecule2.type == "Co") {
	     return bondThick(pattern2colorScale(secondcolor[0][1])) + 1;
	 }
	 if (d.molecule1.type == "Li" && d.molecule2.type == "Ni") {
	     return bondThick(pattern2colorScale(secondcolor[0][2])) + 1;
	 }
	 if (d.molecule1.type == "Co" && d.molecule2.type == "Li") {
	     return bondThick(pattern2colorScale(secondcolor[1][0])) + 1;
	 }
	 if (d.molecule1.type == "Co" && d.molecule2.type == "Co") {
	     return bondThick(pattern2colorScale(secondcolor[1][1])) + 1;
	 }
	 if (d.molecule1.type == "Co" && d.molecule2.type == "Ni") {
	     return bondThick(pattern2colorScale(secondcolor[1][2])) + 1;
	 }
	 if (d.molecule1.type == "Ni" && d.molecule2.type == "Li") {
	     return bondThick(pattern2colorScale(secondcolor[2][0])) + 1;
	 }
	 if (d.molecule1.type == "Ni" && d.molecule2.type == "Co") {
	     return bondThick(pattern2colorScale(secondcolor[2][1])) + 1;
	 }
	 if (d.molecule1.type == "Ni" && d.molecule2.type == "Ni") {
	         return bondThick(pattern2colorScale(secondcolor[2][2])) + 1;
	 }
});
	
}
// ** pattern3 ends ** //

//** Pattern 4 long diagonal functions **//

var longDiagonalBondEnergies = [
	[-0.433, 0.578, -0.144],
	[-0.412, 0.578, -0.165],
	[-0.144, -0.165, 0.310],
]
var longDiagonalBondEnergyScale = d3.scaleLinear().domain([-0.433, 0.578]).range([1.5, 4]);

function populateLongDiagonal(shapes){
	var longDiagonalBonds = [];
	
	for (var i = 0; i < shapes.length; i++) {
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) != 0){
			if(((shapes[i].id +  1 )%9) != 0 && shapes[i + 11]){
				longDiagonalBonds.push([shapes[i], shapes[i + 11]]);
			}
			if(((shapes[i].id +  8 )%9) != 0 && shapes[i + 8 ]){
				longDiagonalBonds.push([shapes[i], shapes[i + 8]]);
			}
		}
		if(Math.floor((shapes[i].id/9) % 2) != 0 && (shapes[i].id%9) == 0){
			if(shapes[i + 8 ]){
				longDiagonalBonds.push([shapes[i], shapes[i + 8]]);
			}
		}
		
		if(Math.floor((shapes[i].id/9) % 2) != 0 && (shapes[i].id%9) != 0){
			if(shapes[i + 10 ]){
				longDiagonalBonds.push([shapes[i], shapes[i + 10]]);
			}
			if(((shapes[i].id +  8 )%9) != 0 && ((shapes[i].id +  7 )%9) != 0 && shapes[i + 7]){
				longDiagonalBonds.push([shapes[i], shapes[i + 7]]);
			}
		}
		if(Math.floor((shapes[i].id/9) % 2) == 0 && (shapes[i].id%9) == 0 && shapes[i + 7]){
			longDiagonalBonds.push([shapes[i], shapes[i + 7]]);
		}
	}
	return longDiagonalBonds;
}

function drawlongDiagonalPattern(bonds){
	
	d3.select("#div1Svg")
	.selectAll(".longDiagonalPattern_shadow")
	.data(bonds)
	.enter()
	.insert("path","g")
	.attr("class",function(d,i){
		return "bondlines_shadow longDiagonalBond_shadow " + "longDiagonalBond_shadow_"+d[0].id + " longDiagonalBond_shadow_" + d[1].id
		+ " longDiagonalBond_shadow_index_" + i;
	})
	.attr("d",function(d){
		return bondLine(d) + " Z";
	})
	.attr("stroke","rgb(114, 182, 239)")
	.attr("stroke-width",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		return longDiagonalBondEnergyScale(longDiagonalBondEnergies[index1][index2]) + 1;
	})
	.attr("display","none")
	
	d3.select("#div1Svg")
	.selectAll(".longDiagonalPattern")
	.data(bonds)
	.enter()
	.insert("path","g")
	.attr("class",function(d,i){
		return "bondlines longDiagonalBond " + "longDiagonalBond_"+d[0].id + " longDiagonalBond_" + d[1].id;
	})
	.attr("d",function(d){
		return bondLine(d) + " Z";
	})
	.attr("stroke","rgb(114, 182, 239)")
	.attr("stroke-width",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		return longDiagonalBondEnergyScale(longDiagonalBondEnergies[index1][index2]);
	})
	.attr("display","none")
	.on("mouseover",function(d,i){
		var mol1 = d[0].type;
		var mol2 = d[1].type;
		d3.selectAll(".bar_longDiagonal_" + mol1 + "_" + mol2).style("fill","red");
		
		d3.selectAll(".longDiagonalBond_shadow_index_" + i).attr("display","inline");
	})
	.on("mouseout",function(d,i){
		d3.selectAll(".bar_longDiagonal").style("fill","steelblue");
		d3.selectAll(".longDiagonalBond_shadow_index_" + i).attr("display","none");
	});
}

function updatelongDiagonalPattern(moleculeIndex){
	d3.selectAll(".longDiagonalBond_shadow_" + moleculeIndex).attr("stroke-width",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		return longDiagonalBondEnergyScale(longDiagonalBondEnergies[index1][index2]) + 1;
	});
	
	d3.selectAll(".longDiagonalBond_" + moleculeIndex).attr("stroke-width",function(d,i){
		var index1 = d[0].elementIndex;
		var index2 = d[1].elementIndex;
		return longDiagonalBondEnergyScale(longDiagonalBondEnergies[index1][index2]);
	});
}

function drawPattern1Div1(){
	
	d3.select("#div1Svg")
		.selectAll(".pattern1Div1Lines")
		.data(div1Pattern1Lines)
		.enter()
		.insert("line","g")
		.attr("class",function(d,i){
			return "pattern1Div1Lines " + "pattern1Lines_"+d.id1 + " pattern1Lines_" + d.id2;
		})
		.attr("x1", function (d) { return d.x1 })
		.attr("y1", function (d) { return d.y1 })
		.attr("x2", function (d) { return d.x2 })
		.attr("y2", function (d) { return d.y2 });
}

function drawPattern1Div2(){
	d3.select("#div2Svg")
		.selectAll(".pattern1Div2Lines")
		.data(div2Pattern1Lines)
		.enter()
		.insert("line","g")
		.attr("class",function(d){
			return "pattern1Div2Lines " + "pattern1Lines_"+d.id1 + " pattern1Lines_" + d.id2;
		})
		.attr("x1", function (d) { return d.x1 })
		.attr("y1", function (d) { return d.y1 })
		.attr("x2", function (d) { return d.x2 })
		.attr("y2", function (d) { return d.y2 });
}

function drawLinePatternLegend(){
	
	 svg5 = svg3.append('g')
     		.attr('transform', 'translate(' + 300 + ',' + 0 + ')');
	 
	
	var headingText = svg5.append("text")
				 .attr("x", 20) //width/2
		         .attr("y", -17) //margin.top/2 - (40 / 2)
		         .attr("text-anchor", "middle")
		         .style("font-size", "16px")
		         .text("Interaction Energy");
	
	var linePatternValues = ["none", "pattern1", "pattern2"];
	
	var radioCircles = svg5.selectAll(".radioCircles")
						.data(linePatternValues)
						.enter()
						.append("circle")
						.attr("class","radioCircles")
						.attr("cx",-40)
						.attr("cy",function(d,i){
							return i * 20;
						})
						.attr("r",function(d,i){
							if(i==0)
								return "3.5px";
							else
								return "4px";
						})
						.style("stroke","white")
						.style("stroke-width",function(d,i){
							if(i==0)
								return "2px";
							else
								return "1px";
						})
						.style("fill",function(d,i){
							if(i==0)
								return "#323745";
							else
								return "white";
						})
						.on("click",function(d,i){
							d3.selectAll(".radioCircles")
								.attr("r","4px")
								.style("stroke-width","1px")
								.style("fill","white");
							
							d3.select(this)
								.attr("r","3.5px")
								.style("stroke-width","2px")
								.style("fill","#323745")
								
							currentPattern = d;	
							changeLinePattern(d);
							updateLegendText(d);
						});
	
	var radioLabels = svg5.selectAll(".radioLabels")
						.data(linePatternValues)
						.enter()
						.append("text")
						.attr("x", -30)
				        .attr("y", function(d,i){
								return i * 20;
						})
						.attr("dy", function(d,i){
								return 3;
						})
				        .style("font-size", "10px")
				        .text(function(d,i){
				        	if(d == "none")
				        		return "None";
				        	if(d == "pattern1")
				        		return "Pattern 1";
				        	if(d == "pattern2")
				        		return "Pattern 2";
				        });
	
	
	
	
	 var gradient = svg.append('defs')
     .append('linearGradient')
     .attr('id', 'gradient')
     .attr('x1', '0%') // bottom
     .attr('y1', '100%')
     .attr('x2', '0%') // to top
     .attr('y2', '0%')
     .attr('spreadMethod', 'pad');
     
	 gradient
	 	.append("stop")
	 	.attr("offset","0%")
	 	.style("stop-color",d3.interpolateOranges(0.2))
	 	.style("stop-opacity",1);
	 	
	 	gradient
	 	.append("stop")
	 	.attr("offset","100%")
	 	.style("stop-color",d3.interpolateOranges(0.8))
	 	.style("stop-opacity",1);
     
	
	var rectangle = svg5
					.append("rect")
					.attr("class","legendSVG")
					.attr("x","30px")
					.attr("y","-5")
					.attr("width","10px")
					.attr("height","50px")
					.style('fill', 'url(#gradient)');
	
	var legendTexts = [
						{
							"pattern1":1.059,
							"pattern2":0.184
						},
						{
							"pattern1":-1.337,
							"pattern2":-0.132 
						}
					];
	
	var legendText = svg5.selectAll(".legendText")
						.data(legendTexts)
						.enter()
						.append("text")
						.attr("class","legendSVG legendText")
						.attr("x",function(d,i){
							return 45;
						})
						.attr("y",function(d,i){
							if(i == 0)
								return 0;
							else
								return (i*50) - 5;
						})
						.text(function(d,i){
							return d.pattern1 + " eV";
						})
						.attr("font-size","7px");
				
}

function updateLegendText(selectedPattern){
	if(selectedPattern == "none"){
		d3.selectAll(".legendSVG")
			.style("visibility","hidden");
	}
	else if(selectedPattern == "pattern1"){
		d3.selectAll(".legendSVG")
		.style("visibility","visible");
		
		d3.selectAll(".legendText")
			.text(function(d,i){
				return d.pattern1 + " eV";
			})
	}
	if(selectedPattern == "pattern2"){
		d3.selectAll(".legendSVG")
		.style("visibility","visible");
		
		d3.selectAll(".legendText")
			.text(function(d,i){
				return d.pattern2 + " eV";
			})
	}
}

function resetRadioButton(){
		d3.selectAll(".radioCircles")
			.attr("r",function(d,i){
				if(i==0)
					return "3.5px";
				else
					return "4px";
			})
			.style("stroke-width",function(d,i){
				if(i==0)
					return "2px";
				else
					return "1px";
			})
			.style("fill",function(d,i){
				if(i==0)
					return "#323745";
				else
					return "white";
			});				
}