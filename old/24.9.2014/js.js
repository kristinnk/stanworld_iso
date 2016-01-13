var mainCanvas = document.getElementById("g");
mainCanvas.getContext('2d').webkitImageSmoothingEnabled = false;
mainCanvas.getContext('2d').oImageSmoothingEnabled = false;
mainCanvas.getContext('2d').mozImageSmoothingEnabled = false;
mainCanvas.getContext('2d').imageSmoothingEnabled = false;
var ctx = mainCanvas.getContext("2d");


var firstRun = true;

var cx = 0;
var cy = 0;

var baseTile = new Image();
baseTile.src = "base_tile.png";

var waterTile = new Image();
waterTile.src = "water_tile.png";

var grassTile = new Image();
grassTile.src = "grass_tile.png";

var foliageTile = new Image();
foliageTile.src = "foliage.png";

var structureTile = new Image();
structureTile.src = "structures.png";

var tmpImage = null;
var mousePos = null;
var map = null;
var foliageMap = null;

var renderedMapCanvas = document.createElement('canvas');
renderedMapCanvas.width = 5000;
renderedMapCanvas.height = 5000;
var renderedMapCtx = renderedMapCanvas.getContext("2d");

var camera = {
  x: 2300,
  y: 0,
}

var Point = {
	x: 0, 
	y: 0,
}

mousePos = null;

generate_ca_map = function(width, height, iterations) { // Cellular automata 4/5 rule
	// Initial map
	tmpMap = [];
	tmpRow = [];
	for (i = 0; i < width; i++) {
		tmpRow = [];
		for (j = 0; j < height; j++) {
			tmpRow.push( Math.floor((Math.random() * 2) + 1) );
		}
		tmpMap.push(tmpRow);
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

sprite = function(x, y, image, context) {
	//ctx.moveTo(x,y);
	context.drawImage(image, x, y, 32, 32);
}

poly = function(x, y, scale, fillstyle, border) {
	ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x+scale, y);
		ctx.lineTo(x, y+(scale/2));
		ctx.lineTo(x-scale, y);
		ctx.lineTo(x, y-(scale/2));
		ctx.lineTo(x+scale, y);
	ctx.closePath();
	ctx.fillStyle = fillstyle;
	ctx.stroke();
	ctx.fill();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

draw_world = function() {
	ctx.clearRect ( 0 , 0 , mainCanvas.width , mainCanvas.height );
	ctx.drawImage(renderedMapCanvas, camera.x, camera.y, mainCanvas.width/2, mainCanvas.height/2, 0, 0, mainCanvas.width, mainCanvas.height);
}

renderWorld = function() {
	xOffset = 2500;
	yOffset = 0;
	for (var j = 1; j < 127; j++) {
		for (var i = 1; i < 127; i++) {
			xpos = (j * 16) - (i * 16);
			ypos = ((j * 16) + (i * 16 )) / 2;

			if ((xpos + xOffset) > (camera.x - 64) && 
				(xpos + xOffset) < (camera.x + 800) &&
				(ypos + yOffset) > (camera.y - 64) && 
				(ypos + yOffset) < (camera.y + 800)
				) {
				// Grass layer
				switch(map[i][j]) {
					case 1:
						//sprite(xpos + xOffset, ypos, grassTile, renderedMapCtx);
						if (map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 64, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Down, left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 96, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Down, right
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 128, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Up, left
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 160, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Up, right
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 192, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner, Down
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 224, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner, Up
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 256, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner, Left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 288, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner, Right
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 320, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // U, Down left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 352, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // U, Down right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 384, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // U, Up left
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 416, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // U, Up right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 448, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Tunnel, right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 608, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Tunnel, left
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 640, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner padding, Down
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] == 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 480, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner padding, Left
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] == 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 512, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner padding, Up
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 544, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						} else if ( // Corner padding, Up
							map[i-1][j-1] == 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 576, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						}
						else {
							renderedMapCtx.drawImage(grassTile, 0, 0, 32, 32, xpos+xOffset, ypos, 32, 32);	
						}
						if (foliageMap[i][j] == 1) {
							renderedMapCtx.drawImage(foliageTile, 0, 0, 32, 32, xpos+xOffset, ypos - 16, 32, 32);	
						}
						break;
					case 2:
						sprite(xpos + xOffset, ypos, waterTile, renderedMapCtx);
						break;
					default: break;
				}

				if (j == cx && i == cy) {
					sprite( xpos + xOffset, ypos, baseTile, renderedMapCtx);
				}
				if (j == 20 && i == 20) {
					map[i][j-1] = 1;
					map[i+1][j-1] = 1;
					map[i-1][j-1] = 1;
					
					map[i][j] = 1;
					map[i+1][j] = 1;
					map[i-1][j] = 1;

					map[i][j+1] = 1;
					map[i+1][j+1] = 1;
					map[i-1][j+1] = 1;

					renderedMapCtx.drawImage(structureTile, 0, 0, 32, 32, xpos+xOffset, ypos - 16, 32, 32);
				}
				if (j == 19 && i == 21) {
					renderedMapCtx.drawImage(structureTile, 32, 0, 32, 32, xpos+xOffset, ypos - 16, 32, 32);
				}
				if (j == 20 && i == 21) {
					renderedMapCtx.drawImage(structureTile, 32, 0, 32, 32, xpos+xOffset, ypos - 16, 32, 32);
				}
			}
		}
	}
}

function check(e) {
    var code = e.keyCode;
    switch (code) {
    	case 65:
        case 37: camera.x -= 10; break; //Left key
        case 87:
        case 38: camera.y -= 10; break; //Up key
        case 68:
        case 39: camera.x += 10; break; //Right key
        case 83:
        case 40: camera.y += 10; break; //Down key
        case 107: cy += 1;
        		  console.log(cy);
        default: console.log(code); //Everything else
    }
}

gameLoop = function() {
	setTimeout( function() { 
		requestAnimationFrame( gameLoop );
		renderWorld();
		draw_world();
		}, 1000 / 30 );
}

mainCanvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(mainCanvas, evt);

	// convert our isometric screen coordinate into orthogonal world coordinate
	mPosX = mousePos.x + camera.x; 
	mPosY = mousePos.y + camera.y;

	cx = Math.floor((mPosY + (mPosX/2))/32);
	cy = Math.floor((mPosY - (mPosX/2))/32);

	console.log(cx);
	console.log(cy);

}, false);

mainCanvas.addEventListener('mousedown', function(evt) {
	console.log("-------------------------");
	console.log(cx);
	console.log(cy);
	console.log("-------------------------");
	if (map[cy][cx] == 1) {
		map[cy][cx] = 2;
	} else {
		map[cy][cx] = 1;
	}
});

window.addEventListener('keydown',this.check,false);
/*
renderedMapCtx.fillStyle="red";
renderedMapCtx.fillRect(0,0, canvas.width, canvas.height);
*/
ctx.fillStyle="gray";
ctx.fillRect(0,0, mainCanvas.width, mainCanvas.height);
ctx.rect(0,0,mainCanvas.width - 200 ,mainCanvas.height);
ctx.stroke();
ctx.clip();

map = generate_ca_map(128, 128, 3);
foliageMap = generate_ca_map(128, 128, 1);

gameLoop();