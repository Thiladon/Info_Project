// A* Pathfinding for HTML5 Canvas Tutorial
// by Christer (McFunkypants) Kaitila
// http://www.mcfunkypants.com
// http://twitter.com/McFunkypants

// Based on Edsger Dijkstra's 1959 algorithm and work by:
// Andrea Giammarchi, Alessandro Crugnola, Jeroen Beckers,
// Peter Hart, Nils Nilsson, Bertram Raphael

// Permission is granted to use this source in any
// way you like, commercial or otherwise. Enjoy!

// the game's canvas element

var canvas = null;
// the canvas 2d context
var ctx = null;
// an image containing all sprites
var spritesheet = null;
// true when the spritesheet has been downloaded
var spritesheetLoaded = false;

// the world grid: a 2d array of tiles
var world = [[]];

// size in the world in sprite tiles
var worldWidth = 18;
var worldHeight = 18;

// size of a tile in pixels
var tileWidth = 32;
var tileHeight = 32;

// start and end of path
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];
var joueur = new player("../img/game/player.png", 7, 14, DIRECTION.BAS);

// ensure that concole.log doesn't cause errors

// the html page is ready
window.onload = function() {
	console.log('Page loaded.');
	canvas = document.getElementById('canvas');
	canvas.width = worldWidth * tileWidth;
	canvas.height = worldHeight * tileHeight;
	// canvas.addEventListener("click", canvasClick, false);
	if (!canvas) alert('Blah!');
	ctx = canvas.getContext("2d");
	if (!ctx) alert('Hmm!');		
	spritesheet = new Image();
	spritesheet.src = 'spritesheet.png';
	spritesheet.src = 'data:image/png;base64,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';
	spritesheet.onload = loaded();
}

// the spritesheet is ready
function loaded()
{
	console.log('Spritesheet loaded.');
	spritesheetLoaded = true;
	createWorld();
}

// fill the world with walls
function createWorld()
{
	world = [	
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
		[1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1],
		[1,0,0,1,0,1,1,0,1,1,1,1,1,1,0,1,0,1],
		[1,0,0,0,0,0,1,0,1,0,1,0,0,1,1,1,0,1],
		[1,0,1,1,1,0,1,0,1,0,1,1,0,0,0,0,0,1],
		[1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,1],
		[1,0,1,0,1,0,1,1,1,0,1,0,0,0,0,1,0,1],
		[1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,1],
		[1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,1],
		[1,0,1,1,0,0,0,1,0,1,1,1,0,0,0,1,0,1],
		[1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
		[1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1],
		[1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];

/*	// calculate initial possible path
	// note: unlikely but possible to never find one...
	currentPath = [];
	while (currentPath.length == 0)
	{
		pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
		pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
		if (world[pathStart[0]][pathStart[1]] == 0)
		currentPath = findPath(world,pathStart,pathEnd);
	}*/
	drawWorld();

}

function drawWorld()
{
	if (!spritesheetLoaded) return;

	console.log('redrawing...');

	var spriteNum = 0;

	// clear the screen
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < worldHeight; y++)
		{

			// choose a sprite to draw
			switch(world[y][x])
			{
			case 1:
				spriteNum = 1;
				break;
			default:
				spriteNum = 0;
				break;
			}

			// draw it
			// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(spritesheet,
			spriteNum*tileWidth, 0,
			tileWidth, tileHeight,
			x*tileWidth, y*tileHeight,
			tileWidth, tileHeight);

		}
	}

	/*// draw the path
	console.log('Current path length: '+currentPath.length);
	for (rp=0; rp<currentPath.length; rp++)
	{
		switch(rp)
		{
		case 0:
			spriteNum = 2; // start
			break;
		case currentPath.length-1:
			spriteNum = 3; // end
			break;
		default:
			spriteNum = 4; // path node
			break;
		}

		ctx.drawImage(spritesheet,
		spriteNum*tileWidth, 0,
		tileWidth, tileHeight,
		currentPath[rp][0]*tileWidth,
		currentPath[rp][1]*tileHeight,
		tileWidth, tileHeight);
	}		*/
}