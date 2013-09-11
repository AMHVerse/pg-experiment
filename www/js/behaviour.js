var db = 0;
var navused = true;
var tstartX, tstartY, tX, tY;
document.addEventListener("deviceready", onDeviceReady, true);
document.addEventListener("menubutton", function() {
	$('.page:visible').find('.bars').click();
	window.scrollTo(0,0);
}, false);
var imagefolder;

function onDeviceReady() {
	//navigator.notification.vibrate(0);
	
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	
	var news = window.localStorage.getItem("news");
	if(news) {
		defaults = $.parseJSON(news);
	}
	
	if(networkState != Connection.NONE) {
		$('body').addClass('connected');
		$.ajax({
			url:"http://www.investincumbria.co.uk/news/json.php",
			dataType:"json",
			success:function(data) {
				window.localStorage.removeItem("news");
				window.localStorage.setItem("news", JSON.stringify(data));
				buildNewsContent(data);
				resized();
			},
			error:function(e) {
				buildNewsContent(defaults);
			}
		});
	} else {
		/*$.each(data,function() {
			var getimg = "images/"+this.img;
			var setimg = this.img;
			saveImage(getimg,setimg,'#'+data.firstName+data.lastName,false);
		});*/
		buildNewsContent(defaults);
	}
	
	$('.page').hide();
	$('#home').show();
	$('.navmenu-panel').hide();
	
	resized();
	$(window).bind('resize',resized)
	
	$('.bars').click(function() {
		var targetid = $(this).attr('href');
		$('.panel-cover').show().click(function() {
			$(this).hide();
			$(targetid).animate({width:'hide'},400);
		});
		$(targetid).animate({width:'show'},400);
		return false;
	});
	
	setupNavigation($('.page, #navmenu-panel, #footer'));
	$('.imgback img, .icon img, .bars img, .zoom img').attr('ondragstart','return false');
	
	if(location.hash) {
		getPageFromHash();
	}
	$(window).bind('hashchange', function() {
		if(navused) {
			getPageFromHash();
		}
	});
};
var inverse = false; 

function gotoPage(targetid) {
	$p = $('.page:visible');
	var st = $(window).scrollTop();
	if(targetid == '#home' || inverse) {
		$p.css('top',-st).animate({width:'hide',left:'100%'},400, function() { $(this).css('top',0); });
		$(targetid).css('left','0%').animate({width:'show'},400);
		inverse = false;
	} else {
		$p.css('top',-st).animate({width:'hide'},400, function() { $(this).css('top',0); });
		$(targetid).css('left','100%').animate({width:'show',left:'0%'},400);
	}
	$('#navmenu-panel').find('li').removeClass('active').find('a[href='+targetid+']').parents('li').addClass('active');
	if($('#navmenu-panel:visible').length > 0) {
		$('#navmenu-panel:visible').animate({width:'hide'},400);
	}
}

var xhr;
function getPage(targetid) {
	var url = targetid.replace('#','');
	url += ".html";
	
	if(xhr) {
		xhr.abort();
	}
	
	xhr = $.ajax({
		url:url,
		dataType:'html',
		success:function(data) {
			var $p = $(targetid,data);
			if($p.length == 0) {
				$p = $('.page:first',data);
				$p.attr('id',targetid.replace('#',''));
			}
			$('.pages').append($p);
			setupNavigation($('.pages').children(':last'));
			resized();
			gotoPage(targetid);
		}
	});
}

function setupNavigation($p) {
	$p.find('.pagelink').unbind('click').click(function() {
		$('.panel-cover').hide();
		var targetid = $(this).attr('href');
		visid = $('.page:visible').attr('id');
		
		if(targetid != '#'+visid) {
			if($(targetid).length > 0) {
				gotoPage(targetid);
			} else {
				getPage(targetid);
			}
		}
	});
	
	$page = $p;
	if(!$p.hasClass('page')) {
		$page = $p.find('.page');
	}
	
	$page.unbind('touchstart').unbind('touchend').unbind('touchmove').bind('touchstart', function(e) {
		var touch = e.originalEvent.touch || e.originalEvent.touches[0];
		tstartX = touch.pageX;
		tstartY = touch.pageY;
	}).bind('touchmove', function(e) {
		var touch = e.originalEvent.touch || e.originalEvent.touches[0];
		tX = touch.pageX;
		tY = touch.pageY;
		
		if(tX < tstartX - 10 || tX > tstartX + 10) {
			e.preventDefault();
		}
	}).bind('touchend', function(e) {
		$p = $(this);
		if(tstartX && tX) {
			if(tX < tstartX - 100 || tX > tstartX + 100) {
				if(tX < tstartX - 100 || tX > tstartX + 100) {
					navused = false;
					location.hash = '#'+$p.attr('id');
					navused = true;
				}
				
				if(tX < tstartX - 100) {
					history.forward();
				}
				if(tX > tstartX + 100) {
					inverse = true;
					history.back();
				}
			}
			tstartX = tstartY = tX = tY = false;
		}
	});
	
	$p.find('.expand_head').click(function() {
		$a = $(this);
		$body = $a.next('.expand_body');
		if($a.hasClass('active')){
			$body.stop(true,true).animate({'height':'hide'},'slow');
			$a.removeClass('active');
		} else {
			$body.stop(true,true).animate({'height':'show'},'slow');
			$a.addClass('active');
		}
	}).filter(':not(.active)').siblings('.expand_body').hide();
}

function getPageFromHash() {
	var myhash = location.hash;
	if(myhash == "") {
		myhash = '#home';
	}
	if(!$(myhash+':visible').length > 0) {
		if($(myhash).length > 0) {
			gotoPage(myhash);
		} else {
			getPage(myhash);
		}
	}
}

function buildNewsContent(newsdata) {

	var news = newsdata;
	
	$('.loading').remove();
	$newscont = $('#newscontainer');
	
	if(newsdata.length > 0) {
		$newscont.append('<ul></ul>');
		for(id in news) {
			newsitem = news[id];
			var licontent = applyTemplate(listtemplate,newsitem);
			var pagecontent = applyTemplate(newstemplate,newsitem);
			$newscont.children('ul').append(licontent);
			$('.pages').append(pagecontent);
			setupNavigation($('.pages').children(':last'));
		}
	} else {
		$newscont.append('Connect to the internet to download the latest news');
	}
	setupNavigation($('#news'));
	
}

function fail(error) {
	console.log(error.code);
}

function resized() {
	$('.container').width($(window).width());
	$('.nav-container').width($(window).width()*.6).height($(document).height());
}

var newstemplate = '<div id="news{{id}}" class="page"><div class="container"><div class="content"><div class="page_content"><h1>{{title}}</h1><p><em>{{date}}</em></p>{{content}}<p><a href="javascript:history.back();" class="backbtn"><span></span>Back to News</a></div></div></div></div>';
var listtemplate = '<li class="pagelink"><a href="#news{{id}}" class="pagelink"><strong>{{title}}</strong><br />{{summary}}<br /><em>{{date}}</em></a></li>';
function applyTemplate(temp, data) {
	var newText = temp;
	for(var nme in data) {
		newText = newText.replace(new RegExp('{{'+nme+'}}','g'), data[nme] || '');
	}
	return newText;
}


var defaults = [];