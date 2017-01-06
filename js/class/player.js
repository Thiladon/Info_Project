var Direction = {
	Down: 0,
	Left: 1,
	Right: 2,
	Up: 3,
	Fixed: 4
}

var collision = [2,3];

var id = 0;
var DUREE_ANIMATION = 6;
var DUREE_DEPLACEMENT = 30;

function character(url, ctx, name, priority, x, y, direction) {
	id++;
	this.ctx = ctx;
	this.name = name;
	this.etatAnimation = -1;
	if(this.name == "player")
	{
		this.id = 1;
	} else {
		this.id = id;	
	}
	this.priority = priority;
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;
	this.pathStart = [];
	currentPath = [];
	this.objectPhase = 1;
	if(this.id !== 1) {
		this.pathEnd = [Math.floor(Math.random()*Arachnea.width),Math.floor(Math.random()*Arachnea.height)];
		while(Arachnea.map[this.pathEnd[1]][this.pathEnd[0]] != 1.1) {
			this.pathEnd = [Math.floor(Math.random()*Arachnea.width),Math.floor(Math.random()*Arachnea.height)];
		}
	}

	/*while (currentPath.length == 0)
	{
		if (parseFloat(Arachnea.map[this.pathStart[0]][this.pathStart[1]]) == 1.1)
			currentPath = findPath(world,pathStart,pathEnd);
	}*/

	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.src = url;
	this.image.onload = function
	() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du player
		this.referenceDuPerso.largeur = this.width / (this.width / 32) ;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
}


character.prototype.update = function(entity, i)
{

	if(this.id == 1 )
	{
		if (Key.isDown(Key.Up)) this.move(Direction.Up);
		if (Key.isDown(Key.Left)) this.move(Direction.Left);
		if (Key.isDown(Key.Down)) this.move(Direction.Down);
		if (Key.isDown(Key.Right)) this.move(Direction.Right);
		if (Key.isDown(Key.Echap)) Arachnea.break = 1;

		var element = this;

		Arachnea.characters.forEach(function(e)
		{
			if(e.id != 1 && e.x == element.x && e.y == element.y && e.objectPhase == 2 && element._frame == 3) {
				Arachnea.characters.splice(Arachnea.characters.indexOf(e), 1);
				
				Arachnea._count++;
			}
		})

		//console.log(this);

	}
	else
	{
		this._iaUpdate(entity, i);
	}

	this._frame = 0; // Numéro de l'image à prendre pour l'animation
	this._decalageX = 0, this._decalageY = 0; // Décalage à appliquer à la position du player
	
	if(this.etatAnimation >= DUREE_DEPLACEMENT)
	{
		// Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	}
	else if(this.etatAnimation >= 0)
	{
		// On calcule l'image (frame) de l'animation à afficher
		this._frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		
		if(this._frame > 3)
		{
			this._frame %= 4;
		}
		
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == Direction.Up) {
			this._decalageY = pixelsAParcourir;
		} else if(this.direction == Direction.Down) {
			this._decalageY = -pixelsAParcourir;
		} else if(this.direction == Direction.Left) {
			this._decalageX = pixelsAParcourir;
		} else if(this.direction == Direction.Right) {
			this._decalageX = -pixelsAParcourir;
		}
		
		// On incrémente d'une frame
		this.etatAnimation++;
	}
	/*
	 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
	 * donc il nous suffit de garder les valeurs 0 pour les variables 
	 * frame, decalageX et decalageY
	 */

	this.draw();
}

character.prototype.draw = function() {
	//console.log(this.direction);
	this.ctx.drawImage(
		this.image, 
		this.largeur * this._frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		(this.x * 32) - (this.largeur / 2) + 16 + this._decalageX, (this.y * 32) - this.hauteur + 24 + this._decalageY, // Point de destination (dépend de la taille du personnage)
		this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
	);
}

character.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case Direction.Down : 
			coord.y++;
			break;
		case Direction.Left : 
			coord.x--;
			break;
		case Direction.Right : 
			coord.x++;
			break;
		case Direction.Up : 
			coord.y--;
			break;
	}
	// console.log(coord);
	return coord;
}

character.prototype.move = function(direction) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}

	// On change la direction du player
	this.direction = direction;
	
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);

	if(this.id == 1 ) {
		if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x > Arachnea.width || prochaineCase.y >= Arachnea.height || ~ collision.indexOf(parseInt(Arachnea.map[prochaineCase.y][this.x])) || ~ collision.indexOf(parseInt(Arachnea.map[this.y][prochaineCase.x]))) {
			// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
			// Ça ne coute pas cher et ca peut toujours servir
			console.log("nope");
			return false;
		}
	}
	// On commence l'animation
	this.etatAnimation = 1;
		
	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
		
	return true;
}

character.prototype._iaUpdate = function(i)
{
	// calculate path
	this.pathStart[0] = this.x;
	this.pathStart[1] = this.y;

	currentPath = this.findPath(this);

	if (currentPath[1]) {
		switch(currentPath[1][0] - this.x)
		{
			case -1:
				this.move(Direction.Left, Arachnea);
				break;

			case 1:
				this.move(Direction.Right, Arachnea);
				break;

			default:
				break;
		}

			switch(currentPath[1][1] - this.y)
		{
			case -1:
				this.move(Direction.Up, Arachnea);
				break;

			case 1:
				this.move(Direction.Down, Arachnea);
				break;

			default:
				break;
		}
	} else {
		if(this.etatAnimation == -1) {
			if(this.objectPhase == 6 && this.x == this.pathEnd[0] && this.pathEnd[1] == -1 && this.y == -1)
			{
				console.log("Phase : 5");
				Arachnea.characters.splice(i, 1);
				this.objectPhase++;
			}

			if(this.objectPhase == 5 && this.x == this.pathEnd[0] && this.pathEnd[1] == -1 && this.y == 0)
			{
				console.log("Phase : 4");
				var movement = this.move(Direction.Up, Arachnea);
				if(movement == true)
					this.objectPhase++;
			}

			if(this.objectPhase == 4 && this.x == this.pathEnd[0] && this.y == 0)
			{
				this.pathEnd[1] = -1;
				console.log(this.pathEnd[1]);
				this.objectPhase++;
			}

			if(this.objectPhase == 3) {
				this.pathEnd = [Math.floor(Math.random()*Arachnea.width), 0]
				this.objectPhase++;
			}

			if(this.objectPhase == 2 && ((new Date).getTime() - this.timeTemp) >=  Arachnea.level[Arachnea._levelCount][2])
			{
				console.log("Phase : 2");
				this.pathStart = [this.x, this.y];
				console.log(this);
				this.objectPhase++;
			}

			if(this.objectPhase == 1)
			{
				console.log("Phase : 1");
				this.timeTemp = (new Date).getTime();
				this.objectPhase++;
			}
		}
	}
}

character.prototype.findPath = function(entity)
{
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy is you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	var maxWalkableTileNum = 99;

	// keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
	// it must have equal height and width. If your Arachnea world is rectangular, 
	// just fill the array with dummy values to pad the empty space.

	var worldSize =	Arachnea.width * Arachnea.height;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours; // empty

	/*

	// alternate heuristics, depending on your Arachnea:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal)
	{	// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1,
		myS = S < Arachnea.height,
		myE = E < Arachnea.width,
		myW = W > -1,
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE)
			result.push({x:E, y:N});
			if(myW)
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE)
			result.push({x:E, y:S});
			if(myW)
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < Arachnea.height;
		myE = E < Arachnea.width;
		myW = W > -1;
		if(myE)
		{
			if(myN)
			result.push({x:E, y:N});
			if(myS)
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN)
			result.push({x:W, y:N});
			if(myS)
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * Arachnea.width),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};
		
		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath(entity)
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:entity.pathStart[0], y:entity.pathStart[1]});
		var mypathEnd = Node(null, {x:entity.pathEnd[0], y:entity.pathEnd[1]});

		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left

		// console.log(length, Open.length);

		while(length = Open.length)
		{

			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?

			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty

		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath(entity);

} // end of findPath() function

