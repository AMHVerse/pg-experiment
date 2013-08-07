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
	$('.vib').click(function() {
		navigator.notification.vibrate(0);
		
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.NONE]     = 'No network connection';
		alert(states[networkState]);
	});
};

$(document).bind("mobileinit", function() {
	$( ".navmenu-link" ).on( "click", function() {
		page.find( ".navmenu-panel" ).panel( "open" );
	});
});