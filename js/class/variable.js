var Key = {
	_pressed: {},

	Left: 37,
	Up: 38,
	Right: 39,
	Down: 40,
	Echap : 27,

	isDown: function(keyCode) {
	return this._pressed[keyCode];
	},

	onKeydown: function(event) {
	this._pressed[event.keyCode] = true;
	},

	onKeyup: function(event) {
	delete this._pressed[event.keyCode];
	}
};

var Direction = {
	Down: 0,
	Left: 1,
	Right: 2,
	Up: 3
}

var runInit = 0;
var collision = [2,3];
var _id = 0;
var DUREE_ANIMATION = 6;
var DUREE_DEPLACEMENT = 30;
var images = {};
var level = [];
var _level = [[3,2500,3000],[6,2500,3000],[10,2000,2000],[15,1500,2000],[25,1500,1000]];
var pathStart = [];
var pathEnd = [0,0];
var currentPath = [];
var renderStats = new Stats();
var updateStats = new Stats();

renderStats.domElement.style.position = 'absolute';
renderStats.domElement.style.right = '0px';
renderStats.domElement.style.top = '0px';

updateStats.domElement.style.position = 'absolute';
updateStats.domElement.style.right = '0px';
updateStats.domElement.style.top = '50px';

document.body.appendChild(renderStats.domElement);
document.body.appendChild(updateStats.domElement);

window.addEventListener('keyup', function(event) {
	Key.onKeyup(event);
}, false);

window.addEventListener('keydown', function(event) { 
	Key.onKeydown(event);
}, false);

function showGameButton()
{
	$('#infoGame').animate({
	    opacity: 1
	}, 500, function() {
	    display : "block"
	});

	if(Arachnea.break == 3) {
		switch(Arachnea._levelCount + 1) {
			case 2 : case 3 : case 4 :
				$('#infoGame .card .card-content .card-title').html("Vous avez fini le niveau : " + Arachnea._levelCount - 1);
				$('#infoGame .card .card-content p').html("En cliquant sur le bouton ci dessous, vous lancerez le niveau suivant");
				$('#infoGame .card .card-action a').html("Continuer");
				break;

			default :
				$('#infoGame .card .card-content .card-title').innerText = "Vous avez fini le jeu !";
				$('#infoGame .card .card-content p').innerText = "Félicitation ! Vous avez terminer notre mini jeu ! En cliquant ci dessous, vous relancerez le jeu encore une fois";
				$('#infoGame .card .card-action a').innerText = "Recommencer";
				break;		

		}
	} else {
		$('#infoGame .card .card-content .card-title').html("/!\\ PAUSE /!\\");
		$('#infoGame .card .card-content p').html("En cliquant sur le bouton ci dessous, vous relancerez le jeu");
		$('#infoGame .card .card-action a').html("Reprendre");
	}
}

$('#gameButton').click(function(e)
{
	e.preventDefault();

	$('#infoGame').animate({
	    opacity: 0
	}, 500, function() {
	    display : "none"
	});

	if(runInit == 0) {
		runInit++;
		Arachnea._onEachFrame(Arachnea.run(Arachnea));
	} else {
		if(Arachnea.break == 3)
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
	}
});