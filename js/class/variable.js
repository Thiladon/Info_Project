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

window.addEventListener('keyup', function(event) {
	Key.onKeyup(event);
}, false);

window.addEventListener('keydown', function(event) { 
	Key.onKeydown(event);
}, false);

var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}

var collision = [2,3];
var Arachnea = null;
var id = 0;
var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;

var _id = 0;
var level = [];
var images = {};
var _level = [[3,2500],[6,2500],[10,2000],[15,1000],[25,750]];

// start and end of path
var pathStart = [];
var pathEnd = [0,0];
var currentPath = [];

var debug = 1;

// Inclusion des class.

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

function showGameButton()
{
	$('#infoGame').animate({
	    opacity: 1
	}, 500, function() {
	    display : "block"
	});

	if(Arachnea.break == 3) {
		switch(Arachnea._levelCount + 1) {
			case 2 : case 3 : case 4 : case 5 :
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
