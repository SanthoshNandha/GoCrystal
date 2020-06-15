


//var heightGap = gap * (Math.sqrt(3)/2);
// function to assign cordinates to atom in division.
// creates 16 atom cordinates for first division.
// refer InteractionEnergy slide for index  and the way they have been placed on screen
function moleculePlacement_9_8(arrangement) {
	 var shapes = [];
	 var index = 0;
	 var xcor, ycor;
	 
	 for(var j=0; j< 8; j++){
		 for(var i=0; i<18; i++){

			 xcor = i * gap;
			 ycor = j * heightGap;

			 molElementIndex = elementIndexByEnegry[arrangement[index]]

			 var moleculeObj = {
				x: xcor, // x cor
				y: ycor, // y cor
				radius: moleculeRadius, // radius hardcoded for time being
				elementIndex : molElementIndex,
				e: moleculeEnergies[molElementIndex],
				type:labels[molElementIndex],
				color:	colors[molElementIndex],
				active:activeList[index]
			 }

			if(j%2 == 0){
				if(i%2 != 0){

					moleculeObj["id"] =  ++index;
					shapes.push(moleculeObj);
					
				}
			}
			else{
				if(i%2 == 0){
					moleculeObj["id"] =  ++index;
					shapes.push(moleculeObj);
				}
			}
		 }
	 }
	 return shapes;
}