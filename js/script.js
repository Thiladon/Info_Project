/*

 	On défini la fonction parallax basé sur les mouvements de la souris,
	quand celle-ci se trouve au dessus du document

*/

$(document).on('mousemove ready resize', function(event){
	var count		= 0.1,
		axeX		= event.pageX,
		axeY		= event.pageY,
		strength	= 1,
		container	= $('.parallax-container');

	container.children().each(function(){
		pos = container.offset();

		var newPosX = (axeX - pos.left - (container.width()/2)) * strength * count * -1 - $(this).width()/2 + container.width()/2;
		$(this).css({ 'left': newPosX + 'px' });
		var newPosY = (axeY - pos.top - (container.height()/2)) * strength * count * -1 - $(this).height()/2 + container.height()/2;
		$(this).css({ 'top': newPosY + 'px' });

		// console.log(
		// 	"count : ", count,
		// 	"\nstrength", strength,
		// 	"\naxeX :", axeX,
		// 	"\npos.left :", pos.left,
		// 	"\ncontainer.width() :", container.width(),
		// 	"\n$(this.width) :", $(this).width(),
		// 	"\n$newPosX :", newPosX, "px",
		// 	"\naxeY :", axeY,
		// 	"\npos.top :", pos.top,
		// 	"\ncontainer.height() :", container.height(),
		// 	"\n$(this.height) :", $(this).height(),
		// 	"\n$newPosY :", newPosY, "px"
		// )

		count++;
	});
})

/*

	Ensuite on viens créer la fonction diaporama :

	- On défini l'ordre des images de façon aléatoire à chaque rechargement de la page (*1)
	- On en profite pour définir l'animation + le chargement Ajax de la page principal au click du .bouton (*2)
	- On appelle ensuite la fonction diaporama qui viendras changer d'image toutes les 3s. (*3)


*/

var images = 0,
	tableau = [0,0,0],
	element = $('.parallax div'),
	j = tableau.length;


$(document).ready(function() {
	// (*1) : 
	
	for (var i = 0; i < tableau.length ; i++) {

		var button 	= $('.button'),
		div		= $('.button div');

	    var randomNumber = Math.floor(Math.random() * 3) + 1;

	    while(j >= 0) {
	       	if(tableau[j] == randomNumber) {
	       		randomNumber = Math.floor(Math.random() * 3) + 1;
	       		j = tableau.length;
	       	}

	       	j--;
	    }

	    tableau[i] = randomNumber;
	}

	// (*2) :

	$('.button').click(function(){
		$('.button p').css("display", "none");
		button.addClass('animate-0');
		div.addClass('animate-0');
		setTimeout(function() { button.addClass('animate-1')}, 200);
		setTimeout(function() { button.addClass('animate-2')}, 300);
		setTimeout(function() { button.addClass('animate-3')}, 600);
		setTimeout(function() { div.addClass('animate-3')}, 600);
		setTimeout(function() { button.addClass('animate-4')}, 900);
		setTimeout(function() { div.addClass('animate-4')}, 900);
	});

	element.css("background-image", "url('img/welcome_home_wallpaper_" + tableau[images] + ".jpg'");

	// (*3) :

	interval = setInterval("diaporama()", 4000);
})

function diaporama(){
	element.css("background-image", "url('img/welcome_home_wallpaper_" + tableau[images] + ".jpg'");
	
	images++;
	
	if(images>2)
		images = 0;
}