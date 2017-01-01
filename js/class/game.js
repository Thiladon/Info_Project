var _id = 0;

function Game() {}

Game.prototype._onEachFrame = (function() {
	  var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	  if (requestAnimationFrame) {
	   return function(cb) {
		  var _cb = function() { cb(); requestAnimationFrame(_cb); }
		  _cb();
		};
	  } else {
		return function(cb) {
		  setInterval(cb, 1000 / Game.fps);
		}
	  }
	})();

Game.prototype.init = function(canvas, fps, background, ground, imageWeb, foreground, world, worldWidth, worldHeight, tileWidth, tileHeight)
{
	this.ctx = canvas.getContext("2d");
	this.background = background;
	this.fps = fps;
	_id++;
	this.id = _id;
	this.background = new Image();
	this.ground = new Image();
	this.web = new Image();
	this.foreground = new Image();
	this.background.src = background;
	this.ground.src = ground;
	this.web.src = imageWeb;
	this.foreground.src = foreground;
	this.map = world;
	this.width = worldWidth;
	this.height = worldHeight;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.widthCase = worldWidth/tileWidth;
	this.heightCase = worldHeight/tileHeight;
	this.characters = new Array();
	this.pathStart = [worldWidth,worldHeight];
}

Game.prototype.addCharacters = function(chara){
	this.characters.push(chara);
}


Game.prototype.drawMap = function()
{
	// clear the screen

	this.ctx.fillStyle = '#000000';
	this.ctx.fillRect(0, 0, canvas.width, canvas.height);

	this.ctx.drawImage(this.background, 0, 0);
	
	for(var num = 1; num <= 3; num++)
	{
		for(var x=0; x < this.width; x++)
		{
			for(var y=0; y < this.height; y++)
			{
				this.drawFunction(this.map[y][x], x, y, num);
			}
		}
	}
	//console.log(this.characters);

	this.update();
}

Game.prototype.drawFunction = function(spriteNum, x, y, num)
{
	if(num == 1)
		this.draw("int", this.ground, spriteNum, x, y);

	if(num == 2)
	{
		if(isIntFloat(spriteNum) == "float")
		{
			if(parseInt(spriteNum) != 1)
			{
				this.draw("float", this.foreground, spriteNum, x, y);
			}

		}
	}

	if(num == 3)
	{
		if(isIntFloat(spriteNum) == "float")
		{
			if(parseInt(spriteNum) == 1 || (~ [2.4,2.6].indexOf(spriteNum) && !~ [1,2,10,11,16,17].indexOf(x) ))
			{
				this.draw("float", this.web, spriteNum, x, y);
			}

		}
	}
}

Game.prototype.run = function() {
	var loops = 0, skipTicks = 1000 / Game.fps,

	maxFrameSkip = 10,
	nextGameTick = (new Date).getTime();
	var entity = this;
	console.log(this);

	return function() {
				loops = 0;
		while ((new Date).getTime() > nextGameTick) {
			updateStats.update();
			entity.update(entity);
			nextGameTick += skipTicks;
			loops++;
		}

		if(loops)
		{
			renderStats.update();
			entity.drawMap(entity);
		}
	};
}

Game.prototype.getInf = function()
{
	console.log(this.map);
	console.log(this.ctx);
	console.log(this.image);
	console.log(this.length);
}

Game.prototype.update = function(entity)
{
	this.characters.sort(function(a, b){
		return b.id - a.id;
	});

	this.characters.forEach(function(element)
	{
		// console.log(Game);
		element.update(Game);
	});
}

Game.prototype.draw = function(type, image, spriteNum, x, y) {
	if(type == "int")
		this.ctx.drawImage(image,
		parseInt(spriteNum)*this.tileWidth, 0,
		this.tileWidth, this.tileHeight,
		x*this.tileWidth, y*this.tileHeight,
		this.tileWidth, this.tileHeight);

	if(type == "float")
		this.ctx.drawImage(image,
		parseInt((((spriteNum - (parseInt(spriteNum) - 0.01))*1000)/100) - 1)*this.tileWidth, 0,
		this.tileWidth, this.tileHeight,
		x*this.tileWidth, y*this.tileHeight,
		this.tileWidth, this.tileHeight);
}


function isIntFloat(number)
{
	if(parseInt(number) != parseFloat(number)) {
		return "float";
	} else 
	{
		return "int";
	}
}