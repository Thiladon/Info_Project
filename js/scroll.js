var scroll = [],
	i = 0,
	left = 0,
	headerPosX,
	compteur = 0,
	hash,
    cnt = 0;

(function () {
	if($('.scroll_container'))
	{
		$('.scroll_container').each(function(e){
			scroll.push($(this));
		});
		
		// Reset position to Top when reload :
		
		move($('#scroll_container-1'));


		$('header ul li a').click(function(e){
			console.log(e.target.id);
			if(e.target.id != "main_page") {
				e.preventDefault();

				cnt = 0;

			    hash = this.hash;
		    	
		    	$('.scroll_container').each(function(){
		        	id = "#" + this.id;
		        	
		        	if(id == hash) {
		        		i = cnt;
		        	}

		    	    cnt++;
			    })

		    	$("#menu").click();
		    	move(scroll[i]);
			}
		})


		$(document).on('mousewheel keydown DOMMouseScroll', function(event) {
		    if($('#nav-overlay').css('opacity') === "0" ) {
			    if(!event.keyCode)
			    	var delta = event.originalEvent.wheelDelta || - event.originalEvent.detail;

			    if((delta > 0 && compteur === 0) || event.keyCode === 38) {
			    	// scroll up
			    	// console.log("Scroll up");
			    	i--;

			    	if(i < 0)
			    		i = 0;

			    } else if((delta < 0 && compteur === 0) || event.keyCode === 40) {
			    	// scroll down
			    	// console.log("Scroll down");
			    	i++;

			    	if(i > scroll.length - 1)
			    		i = scroll.length - 1;
			    }

			    if(compteur === 0)
			    	move(scroll[i]);
			}
		})
	}
}());


function move(element) {
	$('html, body').animate({
    	scrollTop: element.offset().top + 5
	}, {
		duration: 300,
		step: function(){
			compteur++;
		},
		complete: function(){
			compteur = 0;
		}
	});
}

$(window).on('resize', function(){
	console.log("Resizing [...]");
	console.log(scroll[i].offset().top)
	$('body,html').scrollTop(scroll[i].offset().top + 5);
});