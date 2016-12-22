window.onload = function()
{

	var canvas = null;
	var ctx = null;
	var spritesheet = null;
	var spritesheetLoaded = false;
	var world = [[]];
	var worldWidth = 18;
	var worldHeight = 18;
	var tileWidth = 32;
	var tileHeight = 32;
	var pathStart = [worldWidth,worldHeight];
	var pathEnd = [0,0];
	var currentPath = [];

// the html page is ready

	console.log('Page loaded.');
	
	canvas = document.getElementById('canvas');
	canvas.width = worldWidth * tileWidth;
	canvas.height = worldHeight * tileHeight;
	
	if(!canvas) 
		console.error('canvas is :',canvas);
	
	var ctx = canvas.getContext("2d");
	if(!ctx)
		console.error('ctx is:',ctx);

	spritesheet = new Image();
	spritesheet.src = '../img/game/map_sprite.png';
	spritesheet.onload = function()
	{
		spritesheetLoaded = true;
		createWorld();
	}


	// fill the world with walls
	function createWorld()
	{
		world = [	
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1],
			[1,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1],
			[1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
			[1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
			[1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
			[1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
			[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
			[1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
			[1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
			[1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		];
		drawWorld();
	}

	function drawWorld()
	{
		if(!spritesheetLoaded)
		{
			console.error("spritesheet is:",spritesheet)
			return;
		}

		var spriteNum = 0;

		// clear the screen
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for(var x=0; x < worldWidth; x++)
		{
			for(var y=0; y < worldHeight; y++)
			{
				spriteNum = world[y][x];

				// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
				ctx.drawImage(spritesheet,
				spriteNum*tileWidth, 0,
				tileWidth, tileHeight,
				x*tileWidth, y*tileHeight,
				tileWidth, tileHeight);

			}
		}
		drawCharacter();
	}

	function drawCharacter()
	{
		window.joueur = new player("../../img/game/player.png", 1, 1, DIRECTION.BAS);
		setTimeout(function(){window.joueur.dessinerplayer(ctx)},1000);
	}
}