(function() {
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

	$('#nav-overlay').click(function()
	{
		$('#menu').css('left', 0);
		$('header').css('left', -left);
		$(this).animate({'opacity': 0}, {duration: 300, complete: function(){
			$(this).css('display', 'none');
		}})
	})
}());