timerMessage = Object.create(messageObject);
timerMessage.x = 330;
timerMessage.y = 10;
timerMessage.font = "bold 40px Helvetica";
timerMessage.fillStyle = "white";
timerMessage.text = "";
messages.push(timerMessage);

function startScratch(){
	// Sets the new href (URL) for the current window.
	window.location.href = "http://192.168.3.22:5500/prototype";
}

function startDemo(){
	// Sets the new href (URL) for the current window.
	window.location.href = "http://192.168.3.22:5500/demoMode";
}

function loading() {
	playerName = $("#playerName").val();

	if(playerName == undefined || playerName == null || playerName == "" || playerName.length == 0){
		window.alert("Please Enter the player Name");
	}
	d3.json("/json/gameJson.json", function (jsondata) {

		//read values from json file for no of levels
		gamelevls = jsondata.levels;
		if (gamelevls > 0) {
			drawLevelSelection(gamelevls);
			$.get('/getPlayerLevel', {
				"player": playerName, 
			}, 
			function(player){
                var currentLevel = Number(player.level);
               
                nofomoveseachlevel = player.nofomoveseachlevel;
                energyeachlevel = player.energyeachlevel;
                scoreEachLevel = player.scoreEachLevel;
                timeusedeachlevel = player.timeusedeachlevel;

                console.log("nofomoveseachlevel", nofomoveseachlevel);
                console.log("energyeachlevel", energyeachlevel);
                console.log("scoreEachLevel", scoreEachLevel);
                console.log("timeusedeachlevel", timeusedeachlevel);

				for(var i=1; i<=(currentLevel); i++){
					$(".levelSelector_" + i).removeClass("levelSelectorInactive").addClass("levelSelector");
				}
				
				$(".introScreen").addClass('hidden');
				$(".levelSelectionScreen").removeClass('hidden');

				d3.selectAll(".levelSelector")
				.on("click", function(d,i){
					$(".levelSelectionScreen").addClass('hidden');
                    $(".gameScreen").removeClass('hidden');
                    initialLevel = Number(player.level);
                    level = d;
					checklevel();
				})
			}).fail(function(){
			});
		 }
	});
}

function checklevel(){
	// Your callback routine must itself call requestAnimationFrame() if you want to animate another frame at the next repaint.
	animationRequestID = window.requestAnimationFrame(checklevel);
    
    // once level changed after satisfying the energy condition start game again and reinitialize all the game variables
    if (levelchanged) {
        energyvalue = 13000;
        noofmoves = 0; 
		
        //level changed true
        levelchanged = false;
        level++;
        displayLevelCompletePopup(level);
    }
    if(game_started){
        game_started = false;
        gameType = "gameD";
        startGame(level, false);
    }
    updatetim(); // update time 
}

//start game check for level ,read json file depending on level
function startGame(levelCount, levelMoved) {

    // set it to default value so that game over condition is not meet
    gameTimer.time = 100  ;
    // gameTimer.start();
    
    $.getJSON("/getLevelConfig/" + levelCount ,function(resData){	
        var jsondata = resData[0];
        
    	levelDescription = jsondata.levelDescription;
        maxsteps = jsondata.maxsteps; // maximum steps // step count is click on atom
        
        targetenergy = jsondata.targetenergy; // target energy to achieve
		gametime = jsondata.gametime;// game time to complete each level
		
        // set target energy at each level
        targeteateachlevel[level-1] = targetenergy;
        levelActiveAtoms = jsondata.activeAtoms;
        
        gameTimer.stop();
        gameTimer.time = gametime;
        
        maxLi = jsondata.maxLi;
        maxNi = jsondata.maxNi;
        maxCo = jsondata.maxCo;

        maxIons["0"] = jsondata.maxLi;
        maxIons["1"] = jsondata.maxCo;
        maxIons["2"] = jsondata.maxNi;
        
        minLi = jsondata.minLi;
        minNi = jsondata.minNi;
        minCo = jsondata.minCo;

        minIons["0"] = jsondata.minLi;
        minIons["1"] = jsondata.minCo;
        minIons["2"] = jsondata.minNi;
		
		if( game_restarted || levelMoved){
            resetLevel(levelDescription);
		}
		else{
			drawLevel(levelDescription);
		}
		
		var timer = document.getElementById("timer");
		timer.innerHTML = gameTimer.time;

		setUpStepsDisplay();
		updateLevelDisplay(levelCount);
		gameTimer.resetTimeBar();

		displayLevelStartPopup(levelCount,levelDescription,targetenergy,gametime);
    });
}

function drawLevel(levelDescription){   

    molecules = moleculePlacement_9_8(data);
	currentEnergy = drawGrid(molecules);
    level_initial_energy = currentEnergy;
    energyvalue = currentEnergy
	
    drawEnergyBar([currentEnergy]);
	drawInstruction(levelDescription);
	
    drawbonds(molecules);

    d3.selectAll(".molGroup").each(function(d,i){
        d.active = true;
    });

    showActiveBonds();

    freezeMolecules(levelActiveAtoms);
     
    defineCheckBoxAction();
    drawBarChartSingle();
    drawBarChartTriangle();
    drawBarChartLong();
	drawBarChartLongDiagonal();
	
    drawLineChart(currentEnergy, data);

    drawLimitTable();
    updatedUsedMoleculesNumber();
    updatedMaxMoleculesNumber();
    updateScore(0)
}

function resetLevel(levelDescription){

    for (mol in usedIons){
        if (mol == "0")
            usedIons[mol] = 72;
        else
            usedIons[mol] = 0;
    }
    updatedUsedMoleculesNumber();
    updatedMaxMoleculesNumber();

	data = Array.apply(null, new Array(72)).map(Number.prototype.valueOf,0);
	molecules = moleculePlacement_9_8(data);
	updateMolecules(molecules);
	ef = obtainEf2(data);
	level_initial_energy = ef;
	TransitionEnergyBar(ef);
    resetLinechart(ef, data);

    d3.selectAll(".moleculeCircle").attr("stroke", molStroke[0]);
    
    d3.selectAll(".bondlines").remove();
    drawbonds(molecules);

    
    d3.selectAll(".molGroup").each(function(d,i){
        d.active = true;
    });

    showActiveBonds();

    pattern1_classed = Array.apply(true, new Array(72)).map(Boolean.prototype.valueOf,false);
    pattern2_classed = Array.apply(true, new Array(72)).map(Boolean.prototype.valueOf,false);
    pattern3_classed = Array.apply(true, new Array(72)).map(Boolean.prototype.valueOf,false);
    pattern4_classed = Array.apply(true, new Array(72)).map(Boolean.prototype.valueOf,false);

    freezeMolecules(levelActiveAtoms);
    updateInstruction(levelDescription);
    updateScore(0);
}

function displayLevelStartPopup(level,levelDescription,targetenergy,gametime){
    w2popup.open({
        title: 'Starting Level: ' + level,
        body: "<div style=\"padding-top: 10px; padding-left: 30px; font-size: 15px;\"><table style=\"width: 95%;\">" +
        		"<tr style=\"text-align: center; height: 30px;\"><td colspan=\"2\">Requirements</td></tr><tr style=\"height: 30px;\"></tr>" +
        		"<tr style=\"height: 30px;\"> <td style=\"text-align: center;\">" + levelDescription + "</td></tr>" +
        		"<tr style=\"height: 30px;\"> <td style=\"text-align: center;\"></td></tr>" +
        		/*"<tr style=\"height: 30px;\"> <td style=\"text-align: left;\">Target Energy(ev) : </td> <td style=\"text-align: left;\">" + targetenergy + "</td></tr>" +*/
        		"<tr style=\"height: 30px;\"> <td style=\"text-align: left;\">Maximum Time (Sec) : </td> <td style=\"text-align: left;\">" + gametime + "</td></tr>" +
        		"</table></div>",
        width: 400,
        height:400,
        color:'#205081',
        showClose: false, 
        modal : true,
        buttons: '<button class="w2ui-btn" onclick="w2popup.close();">OK</button> ',
        style:'font-family: \'AvenirNext\' , sans-serif ;',
        onClose   : function (event) { gameTimer.start(); },
    });
}

function displayLevelCompletePopup(level){
    w2popup.open({
        title: 'Level: ' + (Number(level) - 1) + ' Completed',
        body: "<div style=\"padding-top: 10px; padding-left: 30px; font-size: 15px;\"><table style=\"width: 95%;\">" +
        		"<tr style=\"text-align: center; height: 30px;\"><td colspan=\"2\">Congratulations!!!</td></tr><tr style=\"height: 30px;\"></tr>" +
        		"<tr style=\"text-align: center; height: 30px;\"><td colspan=\"2\">You attained the Target Energy</td></tr><tr style=\"height: 30px;\"></tr>" +
        		"</table></div>",
        width: 400,
        height:400,
        color:'#205081',
        showClose: false, 
        modal : true,
        buttons: '<button class="w2ui-btn" onclick="w2popup.close();">OK</button>',
        style:'font-family: \'AvenirNext\' , sans-serif ;',
        onClose   : function (event) {  displayLevelSummary() },
    });
}

function displayLevelSummary(){
	
	$("#levelCompleted").html((Number(level) - 1));
	$("#levelTargetEnergy").html(targeteateachlevel[level-2] );
	$("#levelEnergyAchieved").html(Math.round(energyeachlevel[level-2] * 1e2) / 1e2);
    $("#levelStepsUsed").html(nofomoveseachlevel[level-2]);
    $("#levelTimeUsed").html(timeusedeachlevel[level-2]);
	$("#levelScore").html(scoreEachLevel[level-2]);
	$("#levelNextBtn").click(function(){
        if(gameComplete){
            $(".summaryScreen").addClass('hidden');
            gameover();
        }
        else{
            $(".summaryScreen").addClass('hidden');
		    $(".gameScreen").removeClass('hidden');
            displayLevelStartPopup(level,levelDescription,targetenergy,gametime);
            startGame(level, true);
        }
	});
	
	$(".gameScreen").addClass('hidden');
  	$(".summaryScreen").removeClass('hidden');
}

function setUpStepsDisplay(){
	$(".usedStep-div").text("0");
}

function updateLevelDisplay(level){
	$("#level-display").html(level);
}

//update the timer and check for game over and changing level conditions
function updatetim() {  //The game timer
	
    timerMessage.text = gameTimer.time;

    if (energyvalue <= targetenergy && gamelevls!=level  && checkforMoleculeNumbers() ) {

        gameTimer.stop();
        // calculateFinalScore();

        nofomoveseachlevel[level-1] = noofmoves;
        energyeachlevel[level-1] = energyvalue; 
        scoreEachLevel[level-1] = level_current_score;
        timeusedeachlevel[level-1] = gametime - gameTimer.time;

        updatePlayerDetails(playerName, level +1, nofomoveseachlevel, energyeachlevel, targeteateachlevel, scoreEachLevel, timeusedeachlevel);
        levelchanged = true;
    }
    else  if (gameTimer.time == 0 || gameTimer.time < 0) {
    // if the timer ends for a level populate the summary array accordingly
    // if on level 1 game ends that is the timer ends populate only the first element in array.
        setTimeout(function(){ 	
        gameTimer.stop();

        nofomoveseachlevel[level-1] = noofmoves;
        energyeachlevel[level-1] = energyvalue;
        scoreEachLevel[level-1] = level_current_score;
        timeusedeachlevel[level-1] = gametime - gameTimer.time;
        updatePlayerDetails(playerName, level, nofomoveseachlevel, energyeachlevel, targeteateachlevel, scoreEachLevel, timeusedeachlevel);
        
        gameover();
        }, 500);
    }
    // display game over for level 3 when energy value becomes greater than target energy
    else if (energyvalue <= targetenergy && level == gamelevls && checkforMoleculeNumbers()) {
        gameTimer.stop();
        calculateFinalScore();

        nofomoveseachlevel[level-1] = noofmoves;
        energyeachlevel[level-1] = energyvalue;
        scoreEachLevel[level-1] = level_current_score;
        timeusedeachlevel[level-1] = gametime - gameTimer.time;

        updatePlayerDetails(playerName, level, nofomoveseachlevel, energyeachlevel, targeteateachlevel, scoreEachLevel, timeusedeachlevel);

        gameComplete = true;
        levelchanged = true;
        // gameover();
    }
}

function gameover() {
	window.cancelAnimationFrame(animationRequestID);
    gameTimer.stop();
    $(".gameScreen").addClass("hidden");
    $(".endScreen").removeClass("hidden");
    addTable();

    updatePlayerDetails(playerName, level,  nofomoveseachlevel, energyeachlevel, targeteateachlevel, scoreEachLevel, timeusedeachlevel);
}

function updatePlayerDetails(playerName, level, nofomoveseach, energyeach, targeteateach, scoreEachLevel, timeusedeachlevel){


    $.post('/addPlayerDetails', {
        "player": playerName, 
        "level":Number(level),
        "scoreEachLevel" : scoreEachLevel,
        "nofomoveseachlevel":nofomoveseach,
        "energyeachlevel":energyeach,
        "targeteateachlevel":targeteateach,
        "timeusedeachlevel":timeusedeachlevel
    }, 
    function(returnedData){
    }).fail(function(){
    });
}

//add table as summary in the game over div
function addTable() {
    var myTableDiv = document.getElementById("summaryView")
    if (document.getElementById("summaryView").childNodes.length > 1) {
        var nd = document.getElementsByTagName("table");
        myTableDiv.removeChild(nd[0]);
    }
    var table = document.createElement('TABLE')
    var tableHead = document.createElement('THEAD')
    var tableBody = document.createElement('TBODY')

    //table.border = '1'
    table.className += " table table-bordered table-condensed";
    table.appendChild(tableHead);

    var heading = new Array();
    heading[0] = "Level"
    heading[1] = "Steps"
    heading[2] = "Target Energy (eV)"
    heading[3] = "Energy Achieved (eV)"
    heading[4] = "Score"

   console.log("targeteateachlevel", targeteateachlevel);
   console.log("energyeachlevel", energyeachlevel);
   console.log("nofomoveseachlevel", nofomoveseachlevel);
   console.log("scoreEachLevel", scoreEachLevel);
   console.log("initialLevel", initialLevel);

    var stock = new Array()
    for (var i = initialLevel -1; i < nofomoveseachlevel.length; i++) {
        var leveno = i + 1;
        stock[i] = new Array(leveno, nofomoveseachlevel[i],targeteateachlevel[i], Math.round(energyeachlevel[i] * 1e2) / 1e2,scoreEachLevel[i] );
    }

    console.log("stock", stock);
	
    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableHead.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
       // th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }
    
    table.appendChild(tableBody);

    //TABLE ROWS
    for (i = initialLevel-1; i < stock.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table);
    
    // if(writeStats){
    // 	$.post('/addStats', { "playerName": playerName, "stats" : stock}, 
    // 			function(returnedData){
    // 			}).fail(function(){
    // 				console.log("error");
    // 			}); 
    // 	writeStats = false;
    // }
}

// loading screen on click of start game loading is callned. noof levels are read from gamejson file 
// restart btn click// reset all values  and set gamestate to Level1
function restartGame() {

    energyvalue = 13000 
    noofmoves = 0 // avoid of moves condition
    level_current_score = 0;
    level_total_Score = 0;

	  // on restart make the array that hoilds value at each level to 0
	nofomoveseachlevel.length =0 ; // reintialize te array used to display summary
    energyeachlevel.length =0 ;
    scoreEachLevel.length = 0;

	restart = true;
	level = 0; // reinitize to zero to restart again
	levelchanged = false;// make true so that game will start again
	
	resetRadioButton();
	$("#playerName").val("");
	
	$(".introScreen").removeClass('hidden');
	$(".gameScreen").addClass("hidden");
    $(".endScreen").addClass("hidden");
    
    game_started = true;
	game_restarted = true;
	
  }

  function calculateFinalScore(){
    
    var current_time = gameTimer.time ; 
    var level_total_time = gametime;
    var total_time_used = level_total_time - current_time;
    var moves = noofmoves;

    console.log("current_time", current_time);
    console.log("level_total_time", level_total_time);
    console.log("total_time_used", total_time_used);
    console.log("moves", moves);
    console.log("level_current_score", level_current_score);

    console.log("Math.sqrt(total_time_used)", Math.sqrt(total_time_used));
    console.log("(1/Math.sqrt(total_time_used))", (1/Math.sqrt(total_time_used)));

    console.log("(2/(moves^2)*1000))", (2/(moves^2)*1000));
    
    level_total_Score = ((1/Math.sqrt(total_time_used))* (2/(moves^2)*1000)) + level_current_score ;

    console.log(level_total_Score);

  }


