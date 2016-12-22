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

	level = new map(ctx, '../img/game/map_sprite.png', level[0], 18, 18, 32, 32);
	level.image.onload = function() { level.draw()}
}