var id = 0;

function map(ctx, spritesheet, background, foreground, world, worldWidth, worldHeight, tileWidth, tileHeight) {
	id++;
	this.id = id;
	this.ctx = ctx;
	this.image = new Image();
	this.background = new Image();
	this.foreground = new Image();
	this.image.src = spritesheet;
	this.background.src = background;
	this.foreground.src = foreground;
	this.map = world;
	this.width = worldWidth;
	this.height = worldHeight;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.widthCase = worldWidth/tileWidth;
	this.heightCase = worldHeight/tileHeight;
	this.characters = new Array();
}

map.prototype.addCharacter = function(chara) {
	this.characters.push(chara);
}

map.prototype.draw = function()
{
	// clear the screen

	this.ctx.fillStyle = '#000000';
	this.ctx.fillRect(0, 0, canvas.width, canvas.height);

	this.ctx.drawImage(this.background, 0, 0);
for(var num = 1; num <= 2; num++)
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

	for(var i = 0; i < this.characters.length; i++) {
		this.characters[i].drawCharacter(this.ctx);
	}
}

map.prototype.drawFunction = function(spriteNum, x, y, num)
{
	if(num == 1) {
		this.ctx.drawImage(this.image,
		parseInt(spriteNum)*this.tileWidth, 0,
		this.tileWidth, this.tileHeight,
		x*this.tileWidth, y*this.tileHeight,
		this.tileWidth, this.tileHeight);
	} else {
		if(parseInt(spriteNum) != parseFloat(spriteNum)) {
			// Si c'est un float :
			if(spriteNum == 2.7) {
				console.log(parseInt((((spriteNum - 1.99)*1000)/100) - 1));
			}
			this.ctx.drawImage(this.foreground,
			parseInt((((spriteNum - 1.99)*1000)/100) - 1)*this.tileWidth, 0,
			this.tileWidth, this.tileHeight,
			x*this.tileWidth, y*this.tileHeight,
			this.tileWidth, this.tileHeight);
		}
	}
}

map.prototype.getInf = function()
{
	console.log(this.map);
	console.log(this.ctx);
	console.log(this.image);
}