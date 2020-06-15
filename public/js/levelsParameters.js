var levels=[1,2,3,4,5,6];
const MAX_ROW = 8;
const MAX_COL = 9;
const MIN_ROW = 2;
const MIN_COL = 2;
const MIN_ENERGY = 0;
const MAX_LI = 72;
const MAX_CO = 72;
const MAX_NI = 72;

const MAX_TIME = 6000;
const MAX_LEVEL = 6;

function generateLevelParams(level){
    currentLevel = levels[level];

    levelParams = {
        "gridRow" : MAX_ROW,
        "gridCol" : MAX_COL,
        "maxTargetEnergy" : MIN_ENERGY,
        "gametime" : MAX_TIME,
        "maxLi" : MAX_LI,
        "maxCo" : MAX_CO,
        "maxNi" : MAX_NI,
    }

    if(currentLevel == MAX_LEVEL){
        levelParams["gridRow"] = MAX_ROW;
        levelParams["gridCol"] = MAX_COL;
        levelParams["maxTargetEnergy"] = MIN_ENERGY;
        levelParams["gametime"] = MAX_COL;
        levelParams["maxLi"] = MAX_LI;
        levelParams["maxCo"] = MAX_CO;
        levelParams["maxNi"] = MAX_NI;
    }
    else{
        levelParams["gametime"] = (currentLevel * (1/MAX_LEVEL)) * MAX_TIME;

        if(currentLevel > MIN_ROW){
            levelParams["gridRow"] = 0 ; // Random between min and current level
            levelParams["gridCol"] = levelParams["gridRow"] + 1 ;
        }
        else{
            levelParams["gridRow"] = MIN_ROW;
            levelParams["gridCol"] = MIN_COL;
        }

        totalMolecules = levelParams["gridRow"] * levelParams["gridCol"];
        molFactor = totalMolecules/6;

        max_ni = molFactor * 4;
        max_co = max_ni/2;
    }
    console.log(levelParams);
}

generateLevelParams(1)