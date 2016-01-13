draw_sun = function() {
	// ctx.drawImage(sunCycle, 0, 0, 64, 64, config.canvas.main.width - 84, 16, 64, 64 );
	if ( time.count == 0 ) {
		time.frame = 0;
	}

	if ( time.count == (time.trigger) ) {
		time.frame = 1;
	}

	if ( time.count == (time.trigger * 2) ) {
		time.frame = 2;
	}

	if ( time.count == (time.trigger * 3) ) {
		time.frame = 3;
	}

	if ( time.count == (time.trigger * 4) ) {
		time.frame = 4;
	}

	if ( time.count == (time.trigger * 5) ) {
		time.frame = 5;
	}

	if ( time.count == (time.trigger * 6) ) {
		time.frame = 6;
	}

	if ( time.count == (time.trigger * 7) ) {
		time.frame = 7;
	}

	time.count += 1;
	if (time.count == time.trigger * 8) {
		time.count = 0;
	}

	ctx.drawImage(sunCycle, 64 * time.frame, 0, 64, 64, config.canvas.main.width - 130, 16, 64, 64 );
}

draw_interface = function() {
	ctx.drawImage(menuArt, 0, 0, config.canvas.main.width, config.canvas.main.height, 0, 0, config.canvas.main.width, config.canvas.main.height);

	/*
	drawText(ctx, config.canvas.main.width - 180, 70, "Infrastructure");
	
	ctx.beginPath();
		ctx.fillStyle = 'blue';
		ctx.rect( config.canvas.main.width - 180, 94, 100, 20);
		ctx.fill();
	ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.rect( config.canvas.main.width - 180, 94, 160, 20);
		ctx.stroke();
	*/

	drawText(ctx, config.canvas.main.width - 180, 120, "Infrastructure");
	ctx.beginPath();
		ctx.fillStyle = 'blue';
		ctx.rect( bars.infrastructure.x, bars.infrastructure.y, bars.infrastructure.value, bars.infrastructure.height);
		ctx.fill();
	ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.rect( config.canvas.main.width - 180, 144, 160, 20);
		ctx.stroke();	


	drawText(ctx, config.canvas.main.width - 180, 170, "Agriculture");
	ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.rect( bars.agriculture.x, bars.agriculture.y, bars.agriculture.value, bars.agriculture.height);
		ctx.fill();
	ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.rect( config.canvas.main.width - 180, 194, 160, 20);
		ctx.stroke();
	
	
	drawText(ctx, config.canvas.main.width - 180, 220, "Defences");
	ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.rect( bars.defences.x, bars.defences.y, bars.defences.value, bars.defences.height);
		ctx.fill();
	ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.rect( config.canvas.main.width - 180, 244, 160, 20);
		ctx.stroke();
	
	


	drawText(ctx, 20, config.canvas.main.height - 60, "Administrative points :");
	drawText(ctx, 240, config.canvas.main.height - 60, String(gameStats.adminPoints));
	

	drawText(ctx, 300, config.canvas.main.height - 60, "Gold supply :");
	drawText(ctx, 450, config.canvas.main.height - 60, String(gameStats.gold));
	drawText(ctx, 300, config.canvas.main.height - 40, "Food supply :");
	drawText(ctx, 450, config.canvas.main.height - 40, String(gameStats.food));

	drawText(ctx, 600, config.canvas.main.height - 60, "Population      :");
	drawText(ctx, 750, config.canvas.main.height - 60, String(gameStats.population));
	drawText(ctx, 600, config.canvas.main.height - 40, "Popular opinion :");
	drawText(ctx, 750, config.canvas.main.height - 40, String(gameStats.opinion));
}

draw_world = function() {
	ctx.clearRect ( 0 , 0 , config.canvas.main.width , config.canvas.main.height );
	ctx.drawImage(renderedMapCanvas, camera.x, camera.y, config.canvas.main.width - 200, config.canvas.main.height - 80, 0, 0, config.canvas.main.width - 200, config.canvas.main.height - 80);
	draw_interface();
	draw_sun();

}

gameLoop = function() {
	setTimeout( function() { 
		renderWorld();
		update_citizen();
		draw_world();
		requestAnimationFrame( gameLoop );
		}, 1000 / 30 );
}

var map = generate_ca_map(128, 128, 3, true);
var foliageMap = generate_ca_map(128, 128, 1);
prepare_start_townMap(128, 128);
loadText();
townName = generate_name();

gameLoop();