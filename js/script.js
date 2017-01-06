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