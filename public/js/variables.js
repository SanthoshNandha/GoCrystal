// Grid Variable
var data = Array.apply(null, new Array(72)).map(Number.prototype.valueOf,0);
var activeList = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);

var pattern1_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern2_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern3_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);
var pattern4_classed = Array.apply(null, new Array(72)).map(Boolean.prototype.valueOf,false);

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

var nextIndexNumber = {
	"0":1,
	"1":2,
	"2":0,
}

var colors = {
	"0":'green',
	"1":'blue',
	"2":'red',
}

var labels = {
	"0":'Li',
	"1":'Co',
	"2":'Ni',
}

var moleculeEnergies = {
	"0":'0',
	"1":'1',
	"2":'-1',
}

var elementIndexByEnegry = {
"-1":"2",
"0":"0",
"1":"1"
}

var limitLabels = ["Type","Max","Used"];
var moleculeType = [
	{"type":"Li", "color":"green"},
	{"type":"Co", "color":"blue"},
	{"type":"Ni", "color":"red"}
];
var limitTableTextSize = 18;

var gap = 40; // hardcoded to maintain distance
var moleculeRadius = 20;

// hardcoded to maintain distance
var triSide = gap*2;
var heightGap = Math.sqrt((triSide * triSide) - ((triSide/2) * (triSide/2)));

var molecule_font_size = 18;
var molecule_font_dy = (molecule_font_size/2) - 2;

var moleculeSVG_Height = "1080";
var moleculeSVG_Width = "1920";

//Level Variable
var totalSteps = 0;
var previousEnergy = 0;
var currentEnergy = 0;
var molecules = [];
var considersteps = false;
var messages = [];
var noofmoves=0;
var level_initial_energy;
var level_current_score = 0;
var level_total_Score = 0;

var levelActiveAtoms = []

var targeteateachlevel = [];
var nofomoveseachlevel = [];
var energyeachlevel = [];
var scoreEachLevel = [];
var timeusedeachlevel = [];
var level=0;
var targetenergy;

var maxLi = 0;
var maxNi = 0;
var maxCo = 0;
var usedLi = 72;
var usedNi = 0;
var usedCo = 0;

var energyvalue = 13000;
var targetenergy = 100;

var gametime=100;

var maxIons = {
	"0":0,
	"1":0,
	"2":0
}

var usedIons = {
	"0":72,
	"1":0,
	"2":0
}

var minIons = {
	"0":-1,
	"1":0,
	"2":0
}

var animationRequestID;

var writeStats = true;

var levelCount;
var levelDescription;

//Game variables
var gamelevls=0;
var game_started = true;
var game_restarted = false;
var levelchanged  = false;
var playerName = "";
var initialLevel = 1;
var totalScore = 0;

//No game variable
var startTime;
var endTime;
var gameComplete = false;

var gameType;
