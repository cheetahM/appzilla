
$(document).ready(function() {
	
	$('.carousel').carousel({
				  interval: 2000
					});

	$("#submitButton").on("click", function(){
		event.preventDefault();
		$(".cards").hide();
		$(".carousel").show();
		$(".team").hide();
	});
});