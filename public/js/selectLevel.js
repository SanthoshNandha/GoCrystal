function drawLevelSelection(totalLevels){

    levelsRange = [];

    // Create an range array with the range 1 to total levels
    for(var i = 0; i < totalLevels; i++){
        levelsRange[i] = i + 1;
    }

    d3.selectAll(".levelSelector_div").remove();

    d3.select("#levelSelectionArea")
    .selectAll(".levelSelector")
    .data(levelsRange)
    .enter()
    .append("div")
    .attr("class", "levelSelector_div col-sm-4 col-md-4 col-lg-4")
    .append("div")
    .attr("class", function(d,i){
        return "levelSelectCircle levelSelectorInactive levelSelector_" + d;
    })
    .html(function(d,i){
        return d;
    });
}