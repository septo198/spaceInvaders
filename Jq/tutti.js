$(function() {
	$('img[id="bglogo"]').hide().delay(800);
	setInterval(function () {
		$('img[id="bglogo"]').hide().delay(500).fadeIn(800);
		$('img[id="bglogo"]').delay(500).fadeOut(800);
	}, 3000);
	$('img[id="imgtitolo"]').hide().delay(500).fadeIn(2000);
	$('img[id="imgconsole"]').hide().delay(2000).fadeIn(3500);
	$('div[id="schermo"]').hide().delay(2000).fadeIn(3500);
});



