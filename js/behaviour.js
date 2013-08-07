function preinit() {
	var panel = $('.navmenu-panel').detach();
	$('div[data-role="page"]').each(function(i) {
		var $p = $(this);
		var clone = panel.clone();
		clone.attr('id',"navmenu-panel"+i);
		$p.append(clone);
		$p.find('div[data-role="header"]').append('<a href="#navmenu-panel'+i+'" data-role="button" data-icon="bars" data-iconpos="notext"></a>')
	});
	$.mobile.defaultPageTransition = "slide";
	
	panel.hide();
	
	document.addEventListener("deviceready", onDeviceReady, true);
};

function onDeviceReady() {
	alert("Hello");
	$('.vib').click(function() {
		navigator.notification.vibrate(0);
	});
};

$(document).bind("mobileinit", function() {
	$( ".navmenu-link" ).on( "click", function() {
		page.find( ".navmenu-panel" ).panel( "open" );
	});
});