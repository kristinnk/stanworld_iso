function citizen() {
    this.health = 10;
    this.currentTile = {
        x: 65,
        y: 63,
    };

    this.targetTile = {
        x: 65,
        y: 64,
    };

    this.actualCartCoords = {
        x: (this.currentTile.y * 32) - (this.currentTile.x * 32) + 2500,
        y: ((this.currentTile.y * 32) + (this.currentTile.x * 32)) / 2,
    };

    this.status = 0; // 0: normal, 1: defence
    this.intent = null;

    this.drawn = false;

    this.determine_action = function() {

        // this.actualCartCoords.x += 2 ;
        // this.actualCartCoords.y += 1;
        return true;
    };
}

// Todo: implement A* for citizen.
update_citizen = function() {
    if ( citizenList.length < gameStats.population ) {
        var newCitizen = new citizen;
        citizenList.push(newCitizen);
    }
    if ( citizenList.length > gameStats.population ) {
        citizenList.pop();
    }

    for (i = 0; i < citizenList.length; i++) {
        citizenList[i].drawn = false;
        citizenList[i].determine_action();
    }
}

/*
draw_citizen = function() {
    

    for (i == 0; i < citizenList.length; i++) {
        var xOffset = 2500;

        var xpos = (j * 32) - (i * 32);
        var ypos = ((j * 32) + (i * 32 )) / 2;
        ctx.drawImage(citizenImage, 0, 0, 8, 16, 0, 0, citizenList., config.canvas.main.height - 80);
    }
}
*/