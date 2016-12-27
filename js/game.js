// Inclusion des class.

include([
	'../js/class/character.js',
	'../js/class/map.js',
	'../js/class/level.js'
]);

var canvas = null;
var background = null;
var ctx = null;
var world = [[]];
var worldWidth = 19;
var worldHeight = 18;
var tileWidth = 32;
var tileHeight = 32;
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];

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

	var sources = {
		map 		: '../img/game/map_sprite.png',
		user		: '../img/game/character.png',
		fly			: '../img/game/fly.png',
		background	: '../img/game/background.png',
		foreground	: '../img/game/foreground.png'
	};

	loadImages(sources, function(images)
	{
		fly = new player(images.fly.src, "fly", 2, 7, 7, DIRECTION.BAS);
		fly2 = new player(images.fly.src, "fly", 2, 9, 9, DIRECTION.BAS);
		player = new player(images.user.src, "Thilladon", 1, 8, 8, DIRECTION.BAS);
		level = new map(ctx, images.map.src, images.background.src, images.foreground.src, level[0], worldWidth, worldHeight, 32, 32);
		level.addCharacter(fly);
		level.addCharacter(fly2);
		level.addCharacter(player);
		level.image.onload = function() { 
			Interval = setInterval(function() {
				level.draw();
			}, 1000/35);
		}
    });

    // Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		/*clearInterval(Interval);*/

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