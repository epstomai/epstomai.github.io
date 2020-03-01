$(function() {

	$('a.launch.icon.item').click(function() {
		$('#sidebar').sidebar('toggle');
	});

	$('.sidebar a.item').click(function() {
		$('.sidebar a.item').removeClass('active');
		$(this).addClass('active');
	});

	$("a.sidebar-btn").click(function() {
		var loc = "";
		loc = $(this).attr("loc");
		loadArticle(loc);
	});

});

function loadArticle(loc) {
	$('.article').load(loc);
}