	var Key = {
		_pressed: {},

		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,

		isDown: function(keyCode) {
		return this._pressed[keyCode];
		},

		onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
		},

		onKeyup: function(event) {
		delete this._pressed[event.keyCode];
		}
	};

	window.addEventListener('keyup', function(event) {
		Key.onKeyup(event);
	}, false);
    
    window.addEventListener('keydown', function(event) { 
    	Key.onKeydown(event);
	    console.log(event);
	}, false);

// Inclusion des class.

include([
	'../js/class/game.js',
	'../js/class/player.js',
	'../js/class/level.js'
]);

var Game;

var renderStats = new Stats();
var updateStats = new Stats();

renderStats.domElement.style.position = 'absolute';
renderStats.domElement.style.right = '0px';
renderStats.domElement.style.top = '0px';

updateStats.domElement.style.position = 'absolute';
updateStats.domElement.style.right = '0px';
updateStats.domElement.style.top = '50px';

document.body.appendChild(renderStats.domElement);
document.body.appendChild(updateStats.domElement);

/*
	var pathStart = [worldWidth,worldHeight];
	var pathEnd = [0,0];
	var currentPath = [];		
*/

window.onload = function()
{


/*	var onEachFrame;
        
    if (window.webkitRequestAnimationFrame) {
      onEachFrame = function(cb) {
        var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
        _cb();
      };
    } else if (window.mozRequestAnimationFrame) {
      onEachFrame = function(cb) {
        var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
        _cb();
      };
    } else {
      onEachFrame = function(cb) {
        setInterval(cb, 1000 / 60);
      }
    }
    
    window.onEachFrame = onEachFrame;*/

// La page html est chargée.


	var sources = {
		map 		: '../img/game/map_sprite.png',
		webspider	: '../img/game/webspider.png',
		user		: '../img/game/character.png',
		fly			: '../img/game/fly.png',
		background	: '../img/game/background.png',
		foreground	: '../img/game/foreground.png'
	};

	loadImages(sources, function(images)
	{
		canvas = document.getElementById('canvas');
		canvas.width = 19 * 32;
		canvas.height = 18 * 32;

		Game = new Game();
		Game.init(canvas, 50, images.background.src, images.map.src, images.webspider.src, images.foreground.src, level[0], 19, 18, 32, 32);
		player = new character(images.user.src, Game.ctx, "Thilladon", 8, 8, Direction.Down);
		entity = new character(images.fly.src, Game.ctx, "", 7, 7, Direction.Down);
		Game.addCharacters(entity);
		Game.addCharacters(player);

      	Game._onEachFrame(Game.run());
    });
}


/*


window.onload = function()
{


// the html page is ready

	console.log('Page loaded.');
	
	canvas = document.getElementById('canvas');
	canvas.width = worldWidth * tileWidth;
	canvas.height = worldHeight * tileHeight;
	
	if(!canvas) 
		console.error('canvas is :',canvas);
	
	ctx = canvas.getContext("2d");

	if(!ctx)
		console.error('ctx is:',ctx);



	

    // Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		/*clearInterval(Interval);

		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				player.deplacer(DIRECTION.HAUT, level);
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				player.deplacer(DIRECTION.BAS, level);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				player.deplacer(DIRECTION.GAUCHE, level);
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				player.deplacer(DIRECTION.DROITE, level);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
	}

}
*/
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
		numImages++;
    }

    for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
    		if(++loadedImages >= numImages) {
        		callback(images);
        	}
    	}
      	images[src].src = sources[src];
    }
}
//