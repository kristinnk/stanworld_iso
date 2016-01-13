sprite = function(x, y, image, context) {
	context.drawImage(image, x, y, 64, 64);
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

renderWorld = function() {
	var xOffset = 2500;
	var yOffset = 0;
	var scale = 64;

	for (j = 1; j < 127; j++) {
		for (i = 1; i < 127; i++) {
			var xpos = (j * 32) - (i * 32);
			var ypos = ((j * 32) + (i * 32 )) / 2;

			if ((xpos + xOffset) > (camera.x - 64) && 
				(xpos + xOffset) < (camera.x + 1000) &&
				(ypos + yOffset) > (camera.y - 64) && 
				(ypos + yOffset) < (camera.y + 1000)
				) {
				// Grass layer
				switch(map[i][j]) {
					case 1:
						if (map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 64, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Down, left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 96, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Down, right
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 128, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Up, left
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 160, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Up, right
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 192, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner, Down
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 224, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner, Up
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 256, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner, Left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 288, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner, Right
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 320, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // U, Down left
							map[i-1][j] != 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 352, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // U, Down right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 384, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // U, Up left
							map[i-1][j] == 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 416, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // U, Up right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 448, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Tunnel, right
							map[i-1][j] == 2 &&
							map[i+1][j] == 2 &&
							map[i][j-1] != 2 &&
							map[i][j+1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 608, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Tunnel, left
							map[i-1][j] != 2 &&
							map[i+1][j] != 2 &&
							map[i][j-1] == 2 &&
							map[i][j+1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 640, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner padding, Down
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] == 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 480, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner padding, Left
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] == 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 512, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner padding, Up
							map[i-1][j-1] != 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] == 2 ) {
							renderedMapCtx.drawImage(grassTile, 544, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						} else if ( // Corner padding, Up
							map[i-1][j-1] == 2 &&
							map[i+1][j+1] != 2 &&
							map[i-1][j+1] != 2 &&
							map[i+1][j-1] != 2 ) {
							renderedMapCtx.drawImage(grassTile, 576, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						}
						else {
							renderedMapCtx.drawImage(grassTile, 0, 0, 32, 32, xpos+xOffset, ypos, scale, scale);	
						}
						if (foliageMap[i][j] == 1) {
							renderedMapCtx.drawImage(foliageTile, 0, 0, 32, 32, xpos+xOffset, ypos - 32, scale, scale);	
						}
						break;
					case 2:
						sprite(xpos + xOffset, ypos, waterTile, renderedMapCtx);
						break;
					default: break;
				}

				// render mouse selector
				if (j == cx && i == cy) {
					sprite( xpos + xOffset, ypos, baseTile, renderedMapCtx);
				}				
				
				// Render townmap
				if (townMap[i][j].type == 'house' ) {
					renderedMapCtx.drawImage(structureTile, 0, 0, 32, 32, xpos+xOffset, ypos - scale, scale, scale);
					drawText(renderedMapCtx, xpos+xOffset+30 - 32, ypos - 64, townName);
				}

				/*
				if (j == 63 && i == 65) {
					renderedMapCtx.drawImage(structureTile, 32, 0, 32, 32, xpos+xOffset, ypos - scale, scale, scale);
				}
				
				if (j == 64 && i == 65) {
					renderedMapCtx.drawImage(structureTile, 32, 0, 32, 32, xpos+xOffset, ypos - scale, scale, scale);
				}
				*/
			}
		}
	}
	// Render citizen
	for (c = 0; c < citizenList.length; c++) {
		if (citizenList[c].drawn == false) {
			renderedMapCtx.drawImage(citizenImage, 0, 0, 16, 32, citizenList[c].actualCartCoords.x + 30, citizenList[c].actualCartCoords.y - 26, 8, 16);
			citizenList[c].drawn = true;
		}
	}
}