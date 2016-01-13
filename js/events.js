function checkBarCollision(mouse, target) {
    if ( mouse.x > target.x &&
         mouse.x < target.x + target.width &&
         mouse.y > target.y &&
         mouse.y < target.y + target.height ) {
        
        target.value = mouse.x - target.x;

        return true;
    } else {
        return false;
    }
}

function check(e) {
    var code = e.keyCode;
    switch (code) {
    	case 65:
        case 37: camera.x -= 64; break; //Left key
        case 87:
        case 38: camera.y -= 64; break; //Up key
        case 68:
        case 39: camera.x += 64; break; //Right key
        case 83:
        case 40: camera.y += 64; break; //Down key
        case 70: console.log(citizenList); break; // f
        default: console.log(code); //Everything else
                break;
    }
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

config.canvas.main.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(config.canvas.main, evt);

	mousePos.x = ((mousePos.x+32) + camera.x) / ( 64 / 2 );
	mousePos.y = (mousePos.y + camera.y) / ( 64 / 4 );

	cx = Math.floor((mousePos.y + mousePos.x)/2) - 40;
	cy = Math.floor((mousePos.y - mousePos.x)/2) + 40;

}, false);

config.canvas.main.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(config.canvas.main, evt);
    
    if (mousePos.x < config.canvas.main.width - 200 && mousePos.y < config.canvas.main.height - 80) {
    /*
        if (map[cy][cx] == 1) {
    		map[cy][cx] = 2;
    	} else {
    		map[cy][cx] = 1;
    	}
    */
    } else {
        checkBarCollision(mousePos, bars.infrastructure);
        checkBarCollision(mousePos, bars.agriculture);
        checkBarCollision(mousePos, bars.defences);
    }
});

window.addEventListener('keydown',this.check,false);