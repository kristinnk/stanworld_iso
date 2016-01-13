generate_ca_map = function(width, height, iterations, town) { // Cellular automata 4/5 rule
	town = town || false;

	// Initial map
	tmpMap = [];
	var tmpRow = [];
	for (i = 0; i < width; i++) {
		var tmpRow = [];
		for (j = 0; j < height; j++) {
			tmpRow.push( Math.floor((Math.random() * 2) + 1) );
		}
		tmpMap.push(tmpRow);
	}

	// Generate town "platform"
	if (town == true) {
		for (i = Math.floor(width/2) - 4; i < Math.floor(width/2) + 4; i++) {
			var tmpRow = [];
			for (j = Math.floor(height/2) - 4; j < Math.floor(height/2)  + 4; j++) {
				tmpMap[i][j] = 1;
			}
		}
	}


	// Iterations
	for (iter = 0; iter < iterations; iter++) {
		for (i = 0; i < width; i++) {
			for (j = 0; j < height; j++) { 
				// count the water tiles
				count = 0;
				try {
					if (tmpMap[i-1][j-1] == 2) count++;
					if (tmpMap[i][j-1] == 2) count++;
					if (tmpMap[i+1][j-1] == 2) count++;
					if (tmpMap[i-1][j] == 2) count++;
					if (tmpMap[i][j] == 2) count++;
					if (tmpMap[i+1][j] == 2) count++;
					if (tmpMap[i-1][j+1] == 2) count++;
					if (tmpMap[i][j+1] == 2) count++;
					if (tmpMap[i+1][j+1] == 2) count++;

					if (tmpMap[i][j] == 2 && count > 4) {
						tmpMap[i][j] = 2;
					} else if (tmpMap[i][j] == 1 && count > 4) {
						tmpMap[i][j] = 2;
					} else {
						tmpMap[i][j] = 1;
					}

				}
				catch(err) {
					tmpMap[i][j] = 2;
				}
			}
		}

	}

	return tmpMap;
}

generate_name = function() {
	var list_A = ["Sword", "Pork", "Rose", "Shadow", "Spear", "Box", "Hat", "Lantern", "White", "Red", "File", "Axe", "Bow", "Gold"];
	var list_B = ["ville", "ham", "hills", "berg", "burn", "borough", "gate", "burg", "way", "haven"];

	var first_name = Math.floor(Math.random() * list_A.length);
	var second_name = Math.floor(Math.random() * list_B.length);

	var name = list_A[first_name] + list_B[second_name];
	return name;
}

prepare_start_townMap = function(width, height) {
	var tmpMap = [];
	var tmpRow = [];
	for (i = 0; i < width; i++) {
		var tmpRow = [];
		for (j = 0; j < height; j++) {
			tmpRow.push( Math.floor((Math.random() * 2) + 1) );
		}
		tmpMap.push(tmpRow);
	}

	townMap = tmpMap;

	// place initial house
	var house = {
	    type: 'house',
	    level: 1,
	}

	townMap[64][64] = house;
}