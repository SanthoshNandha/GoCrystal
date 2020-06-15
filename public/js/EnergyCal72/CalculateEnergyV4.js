function obtainEf2(half_data){
	
	
	/*data = zeros(1,144);    %default: Li

	data(4*[0:35]+1) = data_half(1:2:71);
	data(4*[0:35]+2) = data_half(2:2:72);*/
	
	var data = new Array(144);
	data.fill(0);
	
	for(var i=0, j=0; i<=35, j<71; i++, j=j+2){
		data[(4*i)] = half_data[j];
	}
	
	for(var i=0, j=1; i<=35, j<72; i++, j=j+2){
		data[(4*i) + 1] = half_data[j];
	}
	
	/*console.log("data --> ");
	console.log(data);
	 */	
	
	/*% generate largercell by image copying
	data_ext = [];
	for i=0:9/9-1
	    for j=0:4/4-1
	        for k=0:3/1-1
	           data_ext = [data_ext data];
	        end
	    end
	end*/
	
	var data_ext = [];
	
	for(var i=0; i<=((9/9)-1); i++){
		for(var j=0; j<=((4/4)-1); j++){
			for(k=0; k<=((3/1)-1); k++){
				data_ext = data_ext.concat(data);
			}
		}
	}
	
	/*console.log("data_ext --> ");
	console.log(data_ext);*/
	
	/*load idx_rp_new_to_ext.mat
	data_trial = data_ext(idx_rp_new_to_ext);*/
	
	var idx_rp_ext_to_new = idx_rp_ext_to_new_array;	
	var data_trial = [];
	
	//console.log(data_ext.length);
	
	for(var i=0; i < data_ext.length; i++){
		data_trial[idx_rp_ext_to_new[i]-1] = data_ext[i];
	}
	
	/*console.log("data_trial -- > ");
	console.log((data_trial));*/
	
	/*load map_to_cluster2.mat
	load map_to_cluster3.mat
	load nlist.mat*/
	
	var map_to_cluster2 = map_to_cluster2_array;
	var nlist = nlist_array;
	
	//neighbor_num = size(nlist,2);	
	var neighbor_num = nlist_array[0].length;
	
	// %%%% Find the corrresponding clusters
	// corr_mat_trial = zeros(1,189);
	// corr_mat_trial

	// % empty cluster
	// corr_mat_trial(1) = 1;
	
	//Find the corrresponding clusters
	var corr_mat_trial = new Array(137);
    corr_mat_trial.fill(0);
	
    //empty cluster 
    corr_mat_trial[0] = 1;
	
	// % point clusters
	// corr_mat_trial(2) = sum(sqrt(3/2)*data_trial,2);
	// corr_mat_trial(3) = sum(sqrt(2)*(1-3/2*data_trial.^2),2);
	
	corr_mat_trial[1] = Number(data_trial.reduce(function(sum, value){
		return sum + (Math.sqrt(3/2) * value);
	},0).toFixed(4));
	
	corr_mat_trial[2] = Number(data_trial.reduce(function(sum, value){
		return sum + (Math.sqrt(2) * (1-3/2 * Math.pow(value,2)));
	},0).toFixed(4));
	
	/*console.log("corr_mat_trial -- > ");
	console.log((JSON.stringify(corr_mat_trial)));*/
	
	
	/*c2start = 3; % 2*length(cluster1)+1*/
	var c2start = 3;
	
	/*console.log("neighbor_num -- > ");
	console.log(((neighbor_num)));*/
	
	for(var i=0; i<432; i++){
		for(var nj=i; nj < neighbor_num; nj++){
			var j = nlist[i][nj] - 1 ;
			/*console.log("j -- > ");
			console.log(((j)));*/
			
			//if(([i, j].sort(compareNumbers)).compare([i, j])){				
				//if(map_to_cluster2[i][nj] > 0){					
					corr_mat_trial[(3 * map_to_cluster2[i][nj] - 2 + c2start) - 1] = corr_mat_trial[( map_to_cluster2[i][nj] - 2 + c2start) -1]  + Math.sqrt(3 / 2) * data_trial[i] * (Math.sqrt(3 / 2) * data_trial[j]);	
					corr_mat_trial[(3 * map_to_cluster2[i][nj] -1 + c2start) -1] = corr_mat_trial[(map_to_cluster2[i][nj] -1 + c2start) - 1] + (Math.sqrt(2) * (1-3 / 2 * Math.pow(data_trial[i],2)) * (Math.sqrt(3/2) * data_trial[j]) + Math.sqrt(2) * (1-3/2 * Math.pow(data_trial[j],2)) * (Math.sqrt(3/2) * data_trial[i]))/2;
					corr_mat_trial[(3 * map_to_cluster2[i][nj] + c2start) -1] = corr_mat_trial[(map_to_cluster2[i][nj] + c2start) - 1] + Math.sqrt(2) * (1-3/2 * Math.pow(data_trial[i],2)) * (Math.sqrt(2) * (1-3/2 * Math.pow(data_trial[j],2)));
				//}
			//}			
		}
	}
	
	/*console.log("corr_mat_trial -- > ");
	console.log(((corr_mat_trial)));*/
	
/*	var cluster_set1 = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	var x = [-746.3772, 0.3919, 4.2450, -1.5107, -3.1275, 8.0582, 0.3413, 0.3100, -3.5427, 0.4857, 1.6802];*/
	
	var cluster_set1 = [1, 2, 4, 5, 6, 7, 8, 9];
	var x = [-4071.3,
	       -8.4228,
	        4.3581,
	        8.7435,
	       -4.6563,
	        6.3030,
	        8.8112,
	       11.9064];
	
	Ef_trial = 0;
	
	//Ef_trial = corr_mat_trial(cluster_set1)*x;	
	for(var i=0; i < cluster_set1.length; i++ ){
		Ef_trial += corr_mat_trial[cluster_set1[i] - 1] * x[i];
	}
	
	
	/*//nCo = length(find(data_trial == 1));
	var nCo = data_trial.reduce(function(count,value){
		return count + (value === 1);
	},0);
	
	//nNi = length(find(data_trial == -1));
	var nNi = data_trial.reduce(function(count,value){
		return count + (value === -1);
	},0);

	var nN = nCo + nNi;
	
	var Ef_Ni = -7.876413516562296e+3;
	var Ef_Co = -3.002232083437709e+3;
	
	if(nN == 0){
		Ef_trial = Ef_trial;
	}
	else{
		Ef_trial = Ef_trial - nCo/nN*Ef_Co - nNi/nN*Ef_Ni;
	}
	
	Ef_trial = Math.round(Ef_trial*10000)/10000;
	Ef_trial = Ef_trial/12/2/3/2/100;*/
	
	
//	console.log(Ef_trial);
	
	return Ef_trial;
}

function compareNumbers(a, b) {
  return a - b;
}

Array.prototype.compare = function(array) {
  if (!array) {
    return false;
  }
  if (this.length !== array.length) {
    return false;
  }
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].compare(array[i])) {
        return false;
      }
    }
    else if (this[i] !== array[i]) {
      return false;
    }
  }
  return true;
}