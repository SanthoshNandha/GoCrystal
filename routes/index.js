/*
 * GET home page.
 */

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/moleculeGame');

exports.game1 = function(req, res){
  res.render('noGame', { title: 'Game' });
};

exports.game2 = function(req, res){
  res.render('gameM1', { title: 'Game' });
};

exports.game3 = function(req, res){
  res.render('gameD', { title: 'Game' });
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getLevelConfig = function(req, res){	
	var collection = db.get('levelConfiguration');
	var level = req.params.level;
	collection.find( {"level" : Number(level) },{},function(e,docs){
		res.json(docs);
    });
};

exports.updateLevelConfig = function(req,res) {
	
	var children = req.body.moleculePattern;
	
	for(var i=0; i < children.length; i++){
		delete children[i]["x"];
		delete children[i]["y"];
		delete children[i]["radius"];
		delete children[i]["fill"];
		delete children[i]["color"];
		delete children[i]["e"];
	}
	
	var collection = db.get('levelConfiguration');
	collection.update({ "level": Number(req.body.level) },
			{
				$set: { 
							"levelDescription" : req.body.levelDescription,
							"children" : children,
							"name":"atom",
							"maxSwapDuration" :Number(req.body.maxSwap),
							"minSwapDuration" : Number(req.body.minSwap),
							"maxsteps" : Number(req.body.maxSteps),
							"considersteps" : (req.body.considerSteps == "true"),
							"targetenergy" : Number(req.body.targetEnergy),
							"gametime" : Number(req.body.maxTime),
							"maxLi":Number(req.body.maxLi),
							"maxNi":Number(req.body.maxNi),
							"maxCo":Number(req.body.maxCo),
							"minLi":Number(req.body.minLi),
							"minNi":Number(req.body.minNi),
							"minCo":Number(req.body.minCo),
							"maxSwapInterval":Number(req.body.maxSwapInterval),
							"maxFreq":Number(req.body.maxFreq)
						} 
			},
			{
				upsert : true
			},
			 function(err, count, results) {
		        res.json(
		                {
		                	"error" : err,
		                	"updateCount" : count,
		                	"updateResult" : results
		                }
		            );
		        });
};

exports.addStats = function(req, res){	
	var playerName = req.body.playerName;
	var playerStats = req.body.stats;
	
	for(var j=0; j < playerStats.length; j++){
		var shapes = playerStats[j][5];
		var shapes2 = playerStats[j][6];
		
		for(var i=0; i < shapes.length; i++){
			delete shapes[i]["x"];
			delete shapes[i]["y"];
			delete shapes[i]["radius"];
			delete shapes[i]["fill"];
		}
		
		for(var i=0; i < shapes2.length; i++){
			delete shapes2[i]["x"];
			delete shapes2[i]["y"];
			delete shapes2[i]["radius"];
			delete shapes2[i]["fill"];
		}
		playerStats[j]["shapes"] = shapes;
		playerStats[j]["shapes2"] = shapes2;
	}
	
	
	var newDoc = {};
	newDoc["playerName"] = playerName;
	newDoc["stats"] = {};
	
	for(var i=0; i < playerStats.length; i++){
		var newStat = {};
		newStat["level"] = playerStats[i][0];
		newStat["Steps"] = playerStats[i][1];
		newStat["Target Energy"] = playerStats[i][2];
		newStat["Energy Achieved"] = playerStats[i][3];
		newStat["Temperature"] = playerStats[i][4];
		newStat["shapes"] = playerStats[i]["shapes"];
		newStat["shapes2"] = playerStats[i]["shapes2"];
		newDoc["stats"][i+1] = 	newStat;	
	}
	
	var collection = db.get('stats');
	collection.insert(newDoc,
		      function(err, results){
			        res.json(
			                {
			                	"error" : err,
			                	"updateResult" : results
			                }
			            );
			        });	
};

exports.checkAddPlayer = function(req, res){
	var playerName = req.query.player;
	var collection = db.get('players');

	collection.find( {"name" : playerName },{},function(err,docs){
		if(err){
			console.log("Error in finding player!!!");
			console.log(err);
		}
		else{
			if(docs.length > 0){
				res.json(docs[0]);
			}
			else{
				collection.update({ "name": playerName },
				{
					$set: { 
						"level":1,
						"nofomoveseachlevel":[],
						"energyeachlevel":[],
						"scoreEachLevel":[],
						"timeusedeachlevel":[]
					}
				},
				{
					upsert : true
				},
				function(err, count, results){
					res.json({
						"name": playerName,
						"level":1,
						"nofomoveseachlevel":[],
						"energyeachlevel":[],
						"scoreEachLevel":[],
						"timeusedeachlevel":[]
					});
				});
			}
		}
  });
}

exports.addPlayerDetails = function(req, res){
	var playerName = req.body.player;
	var totalScore = req.body.score;
	var level = req.body.level;
	var nofomoveseachlevel = req.body.nofomoveseachlevel;
	var energyeachlevel = req.body.energyeachlevel;
	var targeteateachlevel= req.body.targeteateachlevel;
	var scoreEachLevel = req.body.scoreEachLevel;
	var timeusedeachlevel = req.body.timeusedeachlevel

	console.log("nofomoveseachlevel", nofomoveseachlevel);
	console.log("energyeachlevel", energyeachlevel);

	var collection = db.get('players');

	collection.update(
		{"name" : playerName }, 
		{"$set":{
							"level":level,
							"score":totalScore,
							"nofomoveseachlevel":nofomoveseachlevel,
							"energyeachlevel":energyeachlevel,
							"targeteateachlevel":targeteateachlevel,
							"scoreEachLevel":scoreEachLevel,
							"timeusedeachlevel":timeusedeachlevel
						}
		},
		function(err, results){
			if(err){
				console.log("err", err);
			}
			console.log("results", results);
			res.json(
				{
					"error" : err,
					"updateResult" : results
				}
			);
		});
}

exports.instructorView = function(req, res){
	 res.render('instructor', { title: 'Configuration' });
};

exports.scratchMode = function(req, res){
	 res.render('scratchMode', { title: 'scratchMode' });
};

exports.demoMode = function(req, res){
	 res.render('instruction', { title: 'instruction' });
};

exports.scratchModePage = function(req, res){
	return res.redirect('/scratchMode');
};

exports.demoModePage = function(req, res){
	return res.redirect('/demoMode');
};

exports.testPage = function(req, res){
	res.render('testPage', { title: 'testPage' });
};

exports.prototype = function(req, res){
	res.render('prototype', { title: 'prototype' });
};