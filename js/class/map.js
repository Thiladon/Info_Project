function map(ctx, spritesheet, world, worldWidth, worldHeight, tileWidth, tileHeight) {
	this.ctx = ctx;
	this.image = new Image();
	this.image.src = spritesheet;
	this.map = world;
	this.width = worldWidth;
	this.height = worldHeight;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
}

map.prototype.draw = function()
{
	// clear the screen

	this.ctx.fillStyle = '#000000';
	this.ctx.fillRect(0, 0, canvas.width, canvas.height);

	for(var x=0; x < this.width; x++)
	{
		for(var y=0; y < this.height; y++)
		{
			spriteNum = this.map[y][x];

			this.ctx.drawImage(this.image,
			spriteNum*this.tileWidth, 0,
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