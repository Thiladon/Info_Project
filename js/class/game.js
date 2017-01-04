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

Game.prototype.init = function(canvas, fps, background, ground, imageWeb, foreground, scoreBoard, world, level, worldWidth, worldHeight, tileWidth, tileHeight)
{
	_id++;
	this.id = _id;
	this._count = 0;
	this.break = 0;
	
	this.runInit = 0;
	this.level = level;
	this._levelCount = 0;
	this.ctx = canvas.getContext("2d");
	this.background = background;
	this.fps = fps;
	this.timeStart = (new Date).getTime();
	this.background = new Image();
	this.ground = new Image();
	this.web = new Image();
	this.foreground = new Image();
	this.scoreBoard = new Image();
	this.background.src = background;
	this.ground.src = ground;
	this.web.src = imageWeb;
	this.foreground.src = foreground;
	this.scoreBoard.src = scoreBoard;
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
	if(this.break == 0)
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

	// Mise à jour du compteur :

	this.ctx.drawImage(this.scoreBoard, canvas.width - 135, canvas.height - 41);
	this.ctx.font = "32px serif";
	this.ctx.fillStyle = "white";
	this.ctx.fillText(this._count, canvas.width - (135 - 44/2), canvas.height - 14);
	this.ctx.fillText(this.level[this._levelCount][0], canvas.width - (135 - 44*2), canvas.height - 14);


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

Game.prototype.run = function(entity)
{
	loops = 0, skipTicks = 1000 / this.fps,

	maxFrameSkip = 10,
	nextGameTick = (new Date).getTime();

	entity.EntityInverval = setInterval(function()
	{
		entity.addCharacters(new character(images.fly.src, Arachnea.ctx, "", 1, Math.floor(Math.random()*Arachnea.width), 0, Direction.Down));
	}, entity.level[entity._levelCount][1]);

	return function()
	{
			loops = 0;
			while ((new Date).getTime() > nextGameTick)
			{
				if(entity.break === 0) {;
					updateStats.update(); // Mise à jour des statitiques en background
					entity.update(entity);
				
					loops++;
				}

				if(!loops && entity.break === 1) {
					Arachnea.break = 4;
					showGameButton();
				}

				if(!loops && entity.break === 2) {
					Arachnea.drawMap(Arachnea);
					Arachnea.break = 3;
					Arachnea._levelCount++;
					
					showGameButton();
				}
				nextGameTick += skipTicks;
			}


			if(loops)
			{
				renderStats.update(); // Mise a jour des statistiques visuelles.
				if(entity.break === 0)
					entity.drawMap();
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
	this.characters.forEach(function(element)
	{
		if(element.id != 1) {
			if(element.objectPhase == 2) {
				element.priority = 2;
			}
			else {
				element.priority = 0;
			}
		}
	})

	this.characters.sort(function(a, b){
		return b.priority - a.priority;
	});

	var i = 0;

	this.characters.forEach(function(element)
	{
		// console.log(Game);
		element.update(i);
		i++;
	});


	if(this._count == this.level[this._levelCount][0]) {
		this.characters.forEach(function(e){
			if(e.id == 1) {
				Arachnea.characters = [e];
				Arachnea.characters[0].x = 8, Arachnea.characters[0].y = 8, Arachnea.characters[0].direction = 0, Arachnea.characters[0].frame = 0, Arachnea.characters[0].etatAnimation = -1;
				console.log(Arachnea.characters[0]);
			}
		});

		Arachnea.break = 2;
	}
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