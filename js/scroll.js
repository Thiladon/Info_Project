var scroll = [],
	i = 0,
	left = 0,
	headerPosX,
	compteur = 0,
	hash,
    cnt = 0;

(function () {
	
	$('.scroll_container').each(function(e){
		scroll.push($(this));
	});
	
	// Reset position to Top when reload :
	
	if($('body').scrollTop() != $('#scroll_container-1').offset().top)
		move($('#scroll_container-1'));


	$('#menu').click(function(e){
		e.preventDefault();

		left = $('header').width();
		headerPosX = $('header').offset().left;
		
		if(headerPosX < 0) {
			$(this).css('left', left);
			$('header').css('left', 0);
			$('#nav-overlay')
				.css('display', "block")
				.animate({'opacity': 1}, 300)
		} else {
			$(this).css('left', 0);
			$('header').css('left', -left);
			$('#nav-overlay').animate({'opacity': 0}, {duration: 300, complete: function(){
				console.log('done');
				$('#nav-overlay').css('display', 'none');
			}})
		}
	});

	$('header ul li a').click(function(e){
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
	})

	$('#nav-overlay').click(function(){
		$('#menu').css('left', 0);
		$('header').css('left', -left);
		$(this).animate({'opacity': 0}, {duration: 300, complete: function(){
			$(this).css('display', 'none');
		}})
	})


	$(document).on('mousewheel keydown', function(event) {
	    if($('#nav-overlay').css('opacity') === "0" ) {
		    var delta = event.originalEvent.wheelDelta;
		    
		    console.log(delta);

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

		    console.log(compteur);

		    if(compteur === 0)
		    	move(scroll[i]);
		}
	   })
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

$(window).resize(function(){
	console.log("Resizing [...]");
	$('body').scrollTop(scroll[i].offset().top + 5);
});