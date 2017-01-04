$('#gameButton').click(function(e)
{
	e.preventDefault();

	$('#infoGame').animate({
	    opacity: 0
	}, 500, function() {
	    display : "none"
	});

	if(Arachnea.runInit == 0) {
		Arachnea.runInit++;
		Arachnea._onEachFrame(Arachnea.run(Arachnea));
	}

	if(Arachnea.break == 3 && Arachnea.runInit == 1)
	{
		level_count = Arachnea._levelCount

		switch(Arachnea._levelCount + 1)
		{
			case 2: case 3: case 4: case 5:
				clearInterval(Arachnea.EntityInverval);
				Arachnea.init(canvas, 50, images.background.src, images.map.src, images.webspider.src, images.foreground.src, images.scoreBoard.src, level[0], _level, 19, 18, 32, 32);
				Arachnea.addCharacters(new character(images.user.src, Arachnea.ctx, "player", 1, 8, 8, Direction.Down));
				Arachnea._levelCount = level_count;
				Arachnea.EntityInverval = setInterval(function()
				{
					Arachnea.addCharacters(new character(images.fly.src, Arachnea.ctx, "", 1, Math.floor(Math.random()*Arachnea.width), 0, Direction.Down));
				}, Arachnea.level[Arachnea._levelCount][1]);
				Arachnea.break = 0;
				break;

			default:
				id = 0;
				clearInterval(Arachnea.EntityInverval);
				Arachnea.init(canvas, 50, images.background.src, images.map.src, images.webspider.src, images.foreground.src, images.scoreBoard.src, level[0], _level, 19, 18, 32, 32);
				Arachnea.addCharacters(new character(images.user.src, Arachnea.ctx, "player", 1, 8, 8, Direction.Down));
				Arachnea.EntityInverval = setInterval(function()
				{
					Arachnea.addCharacters(new character(images.fly.src, Arachnea.ctx, "", 1, Math.floor(Math.random()*Arachnea.width), 0, Direction.Down));
				}, Arachnea.level[Arachnea._levelCount][1]);
				Arachnea.break = 0;
				break;
		}
	} else if (Arachnea.break == 4 && Arachnea.runInit == 1){
		console.log("test");
		Arachnea.break = 0;
	}
});

window.onload = function()
{

	// La page html est chargée.


	var sources = {
		map 		: '../img/game/map_sprite.png',
		webspider	: '../img/game/webspider.png',
		user		: '../img/game/character.png',
		fly			: '../img/game/fly.png',
		background	: '../img/game/background.png',
		foreground	: '../img/game/foreground.png',
		scoreBoard	: '../img/game/score_Board.png'
	};

	loadImages(sources, function(images)
	{
		canvas = document.getElementById('canvas');
		canvas.width = 19 * 32;
		canvas.height = 18 * 32;

		Arachnea = new Game();
		Arachnea.init(canvas, 50, images.background.src, images.map.src, images.webspider.src, images.foreground.src, images.scoreBoard.src, level[0], _level, 19, 18, 32, 32);
		Arachnea.addCharacters(new character(images.user.src, Arachnea.ctx, "player", 1, 8, 8, Direction.Down));
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