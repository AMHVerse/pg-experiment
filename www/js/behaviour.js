
$(function() {
	$(window).bind('selectstart',function() { return false; });
	
	game.init(characters,obstacles,enemies);
});

var characters = [{
	speed:50,
	accel:0.05,
	jumpheight:50,
	sprite:[
		{url:'blue_bunny_left.png',hitarea:'55,37,40,45,24,53,15,53,5,51,0,47,1,44,8,44,22,39,35,31,48,31'},
		{url:'blue_bunny_more_left.png',hitarea:'53,28,29,52,27,53,12,53,3,52,0,48,0,47,4,43,9,44,19,36,31,24,45,23'},
		{url:'blue_bunny_bit_left.png',hitarea:'52,15,34,51,31,53,5,53,0,48,0,44,6,43,19,24,31,12,42,12'},
		{url:'blue_bunny.png',hitarea:'2,9,1,30,1,45,0,51,3,53,18,53,33,53,34,52,34,45,33,29,32,10,17,8'},
		{url:'blue_bunny_bit_right.png',hitarea:'0,14,18,51,22,53,48,53,53,48,53,45,49,44,46,44,23,11,11,12'},
		{url:'blue_bunny_more_right.png',hitarea:'3,27,30,53,45,53,54,52,57,49,57,46,55,44,45,41,24,23'},
		{url:'blue_bunny_right.png',hitarea:'4,36,37,53,45,53,57,50,60,47,60,44,57,41,39,38,20,29'}
	]
},{
	speed:60,
	accel:0.05,
	jumpheight:50,
	sprite:[
		{url:'green_bunny_left.png',hitarea:'55,37,40,45,24,53,15,53,5,51,0,47,1,44,8,44,22,39,35,31,48,31'},
		{url:'green_bunny_more_left.png',hitarea:'53,28,29,52,27,53,12,53,3,52,0,48,0,47,4,43,9,44,19,36,31,24,45,23'},
		{url:'green_bunny_bit_left.png',hitarea:'52,15,34,51,31,53,5,53,0,48,0,44,6,43,19,24,31,12,42,12'},
		{url:'green_bunny.png',hitarea:'2,9,1,30,1,45,0,51,3,53,18,53,33,53,34,52,34,45,33,29,32,10,17,8'},
		{url:'green_bunny_bit_right.png',hitarea:'0,14,18,51,22,53,48,53,53,48,53,45,49,44,46,44,23,11,11,12'},
		{url:'green_bunny_more_right.png',hitarea:'3,27,30,53,45,53,54,52,57,49,57,46,55,44,45,41,24,23'},
		{url:'green_bunny_right.png',hitarea:'4,36,37,53,45,53,57,50,60,47,60,44,57,41,39,38,20,29'}
	]
},{
	speed:40,
	accel:0.05,
	jumpheight:50,
	sprite:[
		{url:'orange_bunny_left.png',hitarea:'55,37,40,45,24,53,15,53,5,51,0,47,1,44,8,44,22,39,35,31,48,31'},
		{url:'orange_bunny_more_left.png',hitarea:'53,28,29,52,27,53,12,53,3,52,0,48,0,47,4,43,9,44,19,36,31,24,45,23'},
		{url:'orange_bunny_bit_left.png',hitarea:'52,15,34,51,31,53,5,53,0,48,0,44,6,43,19,24,31,12,42,12'},
		{url:'orange_bunny.png',hitarea:'2,9,1,30,1,45,0,51,3,53,18,53,33,53,34,52,34,45,33,29,32,10,17,8'},
		{url:'orange_bunny_bit_right.png',hitarea:'0,14,18,51,22,53,48,53,53,48,53,45,49,44,46,44,23,11,11,12'},
		{url:'orange_bunny_more_right.png',hitarea:'3,27,30,53,45,53,54,52,57,49,57,46,55,44,45,41,24,23'},
		{url:'orange_bunny_right.png',hitarea:'4,36,37,53,45,53,57,50,60,47,60,44,57,41,39,38,20,29'}
	]
},{
	speed:30,
	accel:0.05,
	jumpheight:50,
	sprite:[
		{url:'purple_bunny_left.png',hitarea:'55,37,40,45,24,53,15,53,5,51,0,47,1,44,8,44,22,39,35,31,48,31'},
		{url:'purple_bunny_more_left.png',hitarea:'53,28,29,52,27,53,12,53,3,52,0,48,0,47,4,43,9,44,19,36,31,24,45,23'},
		{url:'purple_bunny_bit_left.png',hitarea:'52,15,34,51,31,53,5,53,0,48,0,44,6,43,19,24,31,12,42,12'},
		{url:'purple_bunny.png',hitarea:'2,9,1,30,1,45,0,51,3,53,18,53,33,53,34,52,34,45,33,29,32,10,17,8'},
		{url:'purple_bunny_bit_right.png',hitarea:'0,14,18,51,22,53,48,53,53,48,53,45,49,44,46,44,23,11,11,12'},
		{url:'purple_bunny_more_right.png',hitarea:'3,27,30,53,45,53,54,52,57,49,57,46,55,44,45,41,24,23'},
		{url:'purple_bunny_right.png',hitarea:'4,36,37,53,45,53,57,50,60,47,60,44,57,41,39,38,20,29'}
	]
}];

var obstacles = [
	{url:"tree.png",width:58,height:107,hitarea:'23,68,19,70,19,74,23,79,29,80,36,78,38,75,38,70,35,69',jumpable:false, title:'Tree'},
	{url:"tree2.png",width:58,height:91,hitarea:'23,68,19,70,19,74,23,79,29,80,36,78,38,75,38,70,35,69',jumpable:false, title:'Tree'},
	{url:"rock1.png",width:50,height:27,hitarea:'26,26,13,24,1,20,6,12,16,2,30,3,43,9,48,18,37,24',jumpable:true, title:'Rock'},
	{url:"rock2.png",width:50,height:28,hitarea:'10,12,4,20,29,24,47,19,39,8',jumpable:true, title:'Rock'},
	{url:"rock3.png",width:50,height:25,hitarea:'3,17,15,10,31,9,42,16,47,23,30,20,18,24',jumpable:true, title:'Rock'}
]

var enemies = [{
	jumpable:true,
	predictstep:60,
	title:'Ghost board',
	sprite:[
		{url:'sledge_left.png',hitarea:'62,30,66,33,66,38,60,46,51,55,39,63,25,75,19,80,14,79,7,66,2,56,3,52,8,48,28,41,40,35,53,30'},
		{url:'sledge_bit_left.png',hitarea:'41,21,34,25,26,35,18,43,10,50,3,57,2,62,10,68,23,74,30,79,33,78,38,74,44,60,50,47,53,38,53,28,51,24,46,22'},
		{url:'sledge.png',hitarea:'20,20,15,22,10,26,7,38,5,53,1,70,1,77,5,79,41,79,43,77,43,70,38,53,36,40,34,28,27,22'},
		{url:'sledge_bit_right.png',hitarea:'8,21,13,21,19,24,32,36,42,47,51,55,53,61,52,63,38,71,25,79,21,78,17,74,10,58,4,45,1,35,-1,27,4,24'},
		{url:'sledge_right.png',hitarea:'4,29,10,28,15,29,27,35,43,41,57,47,64,52,64,54,59,64,55,73,52,78,47,78,41,74,25,62,11,51,1,41,1,36,2,32'}
	]
}]
	
	

var game = {
	player:null,
	objects:[],
	holder:null,
	objects:null,
	enemies:null,
	player:null,
	inv:null,
	startpop:null,
	acclX:0,
	acclY:0,
	targetX:0,
	targetY:0,
	angle:0,
	points:0,
	scoreHolder:null,
	score:0,
	framceCount:0,
	jumping:false,
	c:{},
	init:function(character, obstacles, enemies) {
		g = this;
		g.startpop = $('<div class="popup"><h1>Bunny Slope</h1></div>');
	
		for(var i=0; i < characters.length; i++) {
			var bunny = characters[i];
			g.startpop.append('<label class="charc"><img src="images/'+bunny.sprite[3].url+'" height="53" alt="" /><input type="radio" name="character" data-id="'+i+'" /></label>')
		}
		
		g.startpop.append('<input type="button" class="btn" value="Start game" id="startGame" />');
		
		var $body = $('body');
		
		g.startpop.css({
			width:$body.outerWidth() * 0.8,
			left:$body.outerWidth() * 0.03
		})
		$body.append(g.startpop);
		
		var startbtn = $('#startGame');
		startbtn.click(function() {
			var selchar = $('.charc input:checked');
			if(selchar.length == 0) {
				alert('Please select a character');
			} else {
				g.startpop.remove();
				g.start(characters[selchar.attr('data-id')], obstacles, enemies);
			}
		});
		
		if(g.startpop.outerHeight() < $(window).height()) {
			g.startpop.css({
				top:"50%",
				'margin-top':-(g.startpop.outerHeight()/2)
			});
		}
	},
	start:function(charobj, obstacles, enemies) {
		g = this;
		g.acclX = g.acclY = g.targetX = g.targetY = g.angle = g.points = g.scoreHolder = g.score = g.framceCount = 0;
		g.objects = [];
		g.c = {}
		g.player = g.holder = g.objects = g.enemies = g.player = g.inv = null,
		g.jumping = false;
		g.c = charobj;
		g.obstacles = obstacles;
		g.enemies = enemies;
		g.holder = $('<div id="game"></div>');
		$('body').append(g.holder);
		
		g.player = $('<div id="player" data-hitarea="'+g.c.sprite[3].hitarea+'"><img src="images/'+g.c.sprite[3].url+'" alt="" /></div>');
		g.holder.append(g.player);
		
		g.objects = $('<div id="objects"></div>');
		g.objects.append('<img src="images/head.png" id="headimage" alt="" />');
		g.holder.append(g.objects);
		var oldWidth;
		$(window).resize(function() {
			$('#headimage').height(g.holder.height()*0.3);
			$('#headimage').width(g.holder.width()*4);
			$('#headimage').css({
				margin:"0 -" + g.holder.width()*1.5 + "px" 
			});
			if(oldWidth) {
				var scale = g.holder.width()/oldWidth;
				g.objects.children().each(function() {
					$a = $(this);
					var pos = $a.position();
					$a.css('left', pos.left * scale);
				});
				oldWidth = g.holder.width();
			} else {
				oldWidth = g.holder.width();
			}
		}).resize();
		
		g.scoreHolder = $('<div id="scoreHolder"></div>');
		g.holder.append(g.scoreHolder);
		
		var lastY = g.player.position().top + g.player.height();
		for(var i = 0; i < 2; i++) {
			var newobsid = Math.floor(g.obstacles.length * Math.random());
			var newobj = $('<img src="images/'+g.obstacles[newobsid].url+'" alt="" data-type="'+newobsid+'" data-hitarea="'+g.obstacles[newobsid].hitarea+'" data-jumpable="'+g.obstacles[newobsid].jumpable+'" />');
			
			var newY = Math.random() * (g.holder.height() * 0.6) + lastY + g.obstacles[newobsid].height;
			newobj.css({
				top:newY,
				zIndex:Math.floor(newY + g.obstacles[newobsid].height),
				left:Math.random() * (g.holder.width() * 0.4) - g.obstacles[newobsid].width
			});
			
			g.objects.append(newobj);
			lastY = newY;
		}
		lastY = (g.holder.height() * 0.3);
		for(var i = 0; i < 2; i++) {
			var newobsid = Math.floor(g.obstacles.length * Math.random());
			var newobj = $('<img src="images/'+g.obstacles[newobsid].url+'" alt="" data-type="'+newobsid+'" data-hitarea="'+g.obstacles[newobsid].hitarea+'" data-jumpable="'+g.obstacles[newobsid].jumpable+'" />');
			
			var newY = Math.random() * (g.holder.height() * 0.6) + lastY;
			newobj.css({
				top:newY,
				zIndex:Math.floor(newY + g.obstacles[newobsid].height),
				left:Math.random() * (g.holder.width() * 0.4) + (g.holder.width() * 0.6)
			});
			lastY = newY + newobj.height();
			
			g.objects.append(newobj);
		}
		g.holder.bind('mousemove', function(e) {
			g.moveControl(e);
		});
		g.holder.bind('touchmove', function(e) {
			var touch = e.originalEvent.touch || e.originalEvent.touches[0];
			e.pageX = touch.pageX;
			e.pageY = touch.pageY;
			g.moveControl(e);
		});
		g.holder.click(function() {
			if(g.inv) {
				g.jumping = true;
				g.player.animate({marginTop:-g.c.jumpheight}, 250, function() {
					g.player.animate({marginTop:0}, 250, function() {
						g.jumping = false;
					});
				});
			};
		});
		g.inv = setInterval(function() {
			g.frameChange();
		},50);
	},
	moveControl:function(e) {
		if(g.inv) {
			var x = e.pageX;
			var y = e.pageY;
			
			var pos = g.player.position();
			var playerLeft = pos.left;
			var playerTop = pos.top;// + (g.player.height()/2);
			
			var newX = x - playerLeft;
			var newY = y - playerTop;
			
			var angle = g.radsToDegs(Math.atan(newX/newY));
			
			if(newY > 0) {
				if(angle < -60) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[0].url).end().attr('data-hitarea',g.c.sprite[0].hitarea);
				} else if(angle < -30) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[1].url).end().attr('data-hitarea',g.c.sprite[0].hitarea);
				} else if(angle < -5) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[2].url).end().attr('data-hitarea',g.c.sprite[1].hitarea);
				} else if(angle > 60) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[6].url).end().attr('data-hitarea',g.c.sprite[4].hitarea);
				} else if(angle > 30) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[5].url).end().attr('data-hitarea',g.c.sprite[4].hitarea);
				} else if(angle > 5) {
					g.player.children('img').attr('src','images/'+ g.c.sprite[4].url).end().attr('data-hitarea',g.c.sprite[3].hitarea);
				} else {
					g.player.children('img').attr('src','images/'+ g.c.sprite[3].url).end().attr('data-hitarea',g.c.sprite[2].hitarea);
				}
				
				if(!g.jumping) {
					g.targetY = (newY/(g.holder.height()/2)) * g.c.speed; 
					g.targetX = (newX/(g.holder.width()/2)) * g.c.speed; 
				}
			}
		}
	},
	frameChange:function() {
		var g = this;
		g.framceCount++;
		var pos = $(g.objects).position();
		g.acclX = g.acclX + (g.targetX-g.acclX)*g.c.accel;
		g.acclY = g.acclY + (g.targetY-g.acclY)*g.c.accel;
		
		if(g.targetX < 0 && g.acclX < g.targetX) {
			g.acclX = g.targetX;
		} else if(g.targetX > 0 && g.acclX > g.targetX) {
			g.acclX = g.targetX;
		}
		if(g.acclY > g.targetY) {
			g.acclY = g.targetY;
		}
		g.objects.css({
			left:pos.left - g.acclX,
			top:pos.top - g.acclY
		});
		if(g.acclY > 0) {
			g.score += Math.floor(g.acclY/10);
		
			var plpos = g.player.children('img').offset();
			plpos.right = plpos.left + g.player.children('img').width();
			plpos.bottom = plpos.top + g.player.children('img').height();
			
			g.player.css({
				zIndex:Math.floor(-pos.top + plpos.bottom + g.acclY)
			});
			var objspos = g.objects.position();
			
			var frameObsrate = 30;
			var frameOpts = [
				{ score:100, rate:20 },
				{ score:200, rate:15 },
				{ score:300, rate:12 },
				{ score:400, rate:10 },
				{ score:500, rate:8 },
				{ score:600, rate:6 },
				{ score:700, rate:4 },
				{ score:800, rate:2 }
			];
			
			for(optName in frameOpts) {
				var opt = frameOpts[optName];
				if(g.score > opt.score) {
					frameObsrate = opt.rate;
				}
			}
			
			g.scoreHolder.text(g.score * 200);
			
			if(g.framceCount % frameObsrate == 0) {
				var newobsid = Math.floor(g.obstacles.length * Math.random());
				var newobj = $('<img src="images/'+g.obstacles[newobsid].url+'" alt="" data-type="'+newobsid+'" data-hitarea="'+g.obstacles[newobsid].hitarea+'" data-jumpable="'+g.obstacles[newobsid].jumpable+'" />');
				var nextItemX = 0;
				var nextItemY = 0;
				if(Math.random() * 10 > 8) {
					if(g.targetX < 0) {
						nextItemX = 0 - objspos.left - g.obstacles[newobsid].width;
					} else {
						nextItemX = g.holder.width() - objspos.left;
					}
					nextItemY = (Math.random() * g.holder.height()) - objspos.top;
				} else {  
					nextItemX = (Math.random() * g.holder.width()) - objspos.left;
					nextItemY = plpos.top + g.holder.height() - objspos.top;
				}
				
				newobj.css({
					top:nextItemY,
					zIndex:Math.floor(nextItemY + g.obstacles[newobsid].height),
					left:nextItemX
				});
				g.objects.append(newobj);
			}
			
			if(g.framceCount % (frameObsrate*2) == 0) {
				var newobsid = Math.floor(g.enemies.length * Math.random());
				var newenemy = g.enemies[newobsid];
				var nextItemX = 0 - objspos.left - 60;
				var lorr = Math.random() > 0.5;
				if(lorr) {
					nextItemX = g.holder.width() - objspos.left + 60;
				}
				var nextItemY = plpos.top - objspos.top + (g.acclY*4);
				
				var predictX = nextItemX - (g.acclX * newenemy.predictstep);
				var predictY = nextItemY - (g.acclY * newenemy.predictstep);
				
				var enstepX = (nextItemX-predictX) / newenemy.predictstep;
				var enstepY = (nextItemY-predictY) / newenemy.predictstep;
				if(lorr) {
					enstepX = (predictX-nextItemX) / newenemy.predictstep;
					enstepY = (predictY-nextItemY) / newenemy.predictstep;
				}
				
				var angle = g.radsToDegs(Math.atan((nextItemY-predictY)/(nextItemX-predictX)));
				if((lorr && angle > 0) || (!lorr && angle < 0)) {
					angle = -angle;
				}
				
				var enemy = $('<img class="enemy" alt="" data-type="'+newobsid+'" data-jumpable="'+newenemy.jumpable+'" data-stepx="'+enstepX+'" data-stepy="'+enstepY+'" />');
				enemy.css({
					left:nextItemX,
					top:nextItemY
				});
				
				if(angle < -45) {
					enemy.attr('src','images/'+ newenemy.sprite[0].url).attr('data-hitarea',newenemy.sprite[0].hitarea);
				} else if(angle < -5) {
					enemy.attr('src','images/'+ newenemy.sprite[1].url).attr('data-hitarea',newenemy.sprite[1].hitarea);
				} else if(angle > 45) {
					enemy.attr('src','images/'+ newenemy.sprite[4].url).attr('data-hitarea',newenemy.sprite[4].hitarea);
				} else if(angle > 5) {
					enemy.attr('src','images/'+ newenemy.sprite[3].url).attr('data-hitarea',newenemy.sprite[3].hitarea);
				} else {
					enemy.attr('src','images/'+ newenemy.sprite[2].url).attr('data-hitarea',newenemy.sprite[2].hitarea);
				}
				g.objects.append(enemy);
				
			}
			
			g.objects.children().each(function() {
				$o = $(this);
				if($o.hasClass('enemy')) {
					var enpos = $o.position();
					$o.css({
						top:enpos.top + parseFloat($o.attr('data-stepx')),
						left:enpos.left + parseFloat($o.attr('data-stepy')),
						zIndex:Math.floor(-pos.top + enpos.top + $o.height() + g.acclY)
					});
				}
				var objpos = $o.offset();
				
				objpos.right = objpos.left + $o.width();
				objpos.bottom = objpos.top + $o.height();
				
				if((objpos.left < plpos.left && objpos.right > plpos.left ||
				objpos.left < plpos.right && objpos.right > plpos.right || objpos.left > plpos.left && objpos.right < plpos.right) && 
				(objpos.top < plpos.top && objpos.bottom > plpos.top ||
				objpos.top < plpos.bottom && objpos.bottom > plpos.bottom || objpos.top > plpos.top && objpos.bottom < plpos.bottom)) {
					var area1 = $o.attr('data-hitarea');
					var area2 = g.player.attr('data-hitarea');	
					if(area1)	 {		
						var area1arr = area1.split(',');
						var area2arr = area2.split(',');
						var arr1points = [];
						var arr2points = [];
						
						for(var i = 0; i < area1arr.length;i+=2) {
							arr1points.push({ x:parseFloat(area1arr[i]) + objpos.left, y:parseFloat(area1arr[i+1]) + objpos.top });
						}
						for(var i = 0; i < area2arr.length;i+=2) {
							arr2points.push({ x:parseFloat(area2arr[i]) + plpos.left, y:parseFloat(area2arr[i+1]) + plpos.top });
						}
						
						if(g.hittestAreas(arr1points,arr2points) || g.hittestAreas(arr2points,arr1points)) {
							if((g.jumping && $o.attr('data-jumpable') == 'false') || !g.jumping) {
								g.player.stop();
								clearInterval(g.inv);
								g.inv = null;
								g.endGame($o);
							}
						}
					}
				}
				
				if(objpos.bottom < 0 || ($o.hasClass('enemy') && (objpos.top > g.holder.height() + 20 || ($o.attr('data-stepx') > 0 && objpos.left > g.holder.width()) || ($o.attr('data-stepx') < 0 && objpos.left < 0)))) {
					$o.detach();
				}
			});
		}
	},
	ccw:function(x, y, z) {
		return (z.y-x.y) * (y.x-x.x) >= (y.y-x.y) * (z.x-x.x);
	},
	intersection:function(a, b, c, d) {
		return this.ccw(a, c, d) !== this.ccw(b, c, d) && this.ccw(a, b, c) !== this.ccw(a, b, d);
	},
	hittestAreas:function(area1, area2) {
		var found = false;
		for(var i = 0;i < area1.length; i++) {
			if(!found) {
				found = this.hitTestPolygon(area1[i], area2);
			}
		}
		return found;
	},
	hitTestPolygon:function(p, poly) {
		var sides = poly.length,
			origin = {x:0, y:p.y},
			hits = 0,
			s1,
			s2,
			i;

		// Test intersection of an external ray against each polygon side.
		for (i = 0; i < sides; i++) {
			s1 = poly[i];
			s2 = poly[(i+1) % sides];
			origin.x = Math.min(origin.x, Math.min(s1.x, s2.x)-1);
			hits += (this.intersection(origin, p, s1, s2) ? 1 : 0);
		}

		// Return true if an odd number of hits were found.
		return hits % 2 > 0;
	},
	radsToDegs:function(rads) {
		return rads * (180/Math.PI);
	},
	degssToRads:function(degs) {
		return degs * (Math.PI/180);
	},
	endGame:function(killer) {
		var g = this;
		var $endpop = $('<div class="popup"><h1>You crashed</h1></div>');
		if(killer.hasClass('enemy')) { 
			var item = g.enemies[killer.attr('data-type')];
			$endpop.append('<p>A '+item.title+' got you</p>');
		} else { 
			var item = g.obstacles[killer.attr('data-type')];
			$endpop.append('<p>You hit a '+item.title+'</p>');
		}
		$endpop.append('<p>Your score was '+(g.score * 200)+'</p>');
		$endpop.append('<input type="button" value="Try again?" id="restart" class="btn" />');
		$endpop.css({
			width:$('body').outerWidth() * 0.8,
			left:$('body').outerWidth() * 0.03
		})
		$('body').append($endpop);
		
		if($endpop.outerHeight() < $(window).height()) {
			$endpop.css({
				top:"50%",
				'margin-top':-($endpop.outerHeight()/2)
			});
		}
		
		$('body').append($endpop);
		$('#restart').click(function() {
			$('body').empty().append(g.startpop);
			var startbtn = $('#startGame');
			startbtn.click(function() {
				var selchar = $('.charc input:checked');
				if(selchar.length == 0) {
					alert('Please select a character');
				} else {
					g.startpop.remove();
					g.start(characters[selchar.attr('data-id')], obstacles, enemies);
				}
			});
		});
	}
}