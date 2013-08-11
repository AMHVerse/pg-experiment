var db = 0;
var navused = true;

document.addEventListener("deviceready", onDeviceReady, true);
document.addEventListener("menubutton", function() {
	$('.page:visible').find('.bars').click();
	window.scrollTo(0,0);
}, false);


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
	
	var teams = window.localStorage.getItem("team");
	if(teams) {
		defaults = $.parseJSON(teams);
	}
	
	if(networkState == Connection.WIFI || networkState == Connection.ETHERNET || networkState == Connection.CELL_4G) {
		$.ajax({
			url:"http://www.sck-webworks.co.uk/behaviour/team.php",
			success:function(data) {
				window.localStorage.removeItem("team");
				window.localStorage.setItem("team", JSON.stringify(data));
				buildContent(data);
			},
			error:function(e) {
				buildContent(defaults);
			}
		});
		resized();
	} else {
		buildContent(defaults);
	}
	
	if(location.hash) {
		getPageFromHash();
	}
	$(window).bind('hashchange', function() {
		if(navused) {
			getPageFromHash();
			navused = true;
		}
	});
};

function getPageFromHash() {
	var myhash = location.hash;
	if(myhash == "") {
		myhash = '#home';
	}
	if(!$(myhash+':visible').length > 0) {
		$('.pagelink[href*='+myhash+']:eq(0)').click();
	}
}

function buildContent(team) {

	var contacts = team;
	
	for(id in contacts) {
		contact = contacts[id];
		var licontent = applyTemplate(listtemplate,contact);
		var pagecontent = applyTemplate(contacttemplate,contact);
		$('.listview').append(licontent);
		$('body').append(pagecontent);
	}
	
	var panel = $('.navmenu-panel');
	
	$('.page').hide()
	
	setTimeout(function () {
		
		var options = new ContactFindOptions();
		options.filter = '';
		options.multiple = true;
		if(navigator.contacts) {
			navigator.contacts.find(["displayName","name","phoneNumbers"],function(result) {
		
				$('.page').each(function(i) {
					var $p = $(this);
					
					if($p.attr('data-phone')) {
						var firstname = $p.attr('data-firstname');
						var lastname = $p.attr('data-lastname');
						var phone = $p.attr('data-phone');
						var email = $p.attr('data-email');
						var img = new Image();
						img.src = $p.find('.image_cell').find('img').attr('src');
						
						found = false;
						for(item in result) {
							var fc = result[item];
							if(fc.displayName = firstname + " " + lastname || fc.name.givenName == firstname && fc.name.familyName == lastname) {
								var phonefound = false;
								if(fc.phoneNumbers) {
									for(var i = 0; i < fc.phoneNumbers.length; i++) {
										if(fc.phoneNumbers[i].value == phone) {
											phonefound = true;
										}
									}
								}
								if(phonefound) {
									found = true;
								}
							}
						}
						if(!found) {
							addContactButton($p,firstname,lastname,phone, email, getBase64Image(img));
						} else {
							$p.find('.actions').append('<a href="" class="addContact btn ui-disabled" data-role="button">Added</a>');
						}
					}
				});
			},function(error) {
				console.log(error);
			},options);
		}
	}, 10);
	
	$('.navmenu-panel').hide();
	$('#home').addClass('page');
	
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
	
	$('.pagelink').click(function() {
		$('.panel-cover').hide();
		var targetid = $(this).attr('href');
		visid = $('.page:visible').attr('id');
		
		if($(targetid).length > 0 && targetid != '#'+visid) {
			if(targetid == '#home') {
				$('.page:visible').animate({width:'hide',left:'100%'},400);
				$(targetid).animate({width:'show'},400);
			} else {
				$('.page:visible').animate({width:'hide'},400);
				$(targetid).css('left','100%').animate({width:'show',left:'0%'},400);
			}
			if($('#navmenu-panel:visible').length > 0) {
				$('#navmenu-panel:visible').animate({width:'hide'},400);
			}
		}
	});
	
	$('.loading').remove();
}

function resized() {
	$('.container').width($(window).width());
	$('.nav-container').width($(window).width()*.6).height($(document).height());
}

function addContactButton(target,firstname,lastname,phone,email,img) {
	target.find('.actions').append('<a href="" class="addContact btn">Add '+firstname+'</a>');
	var addLink = target.find('.addContact');
	addLink.click(function() {
		var addLink = $(this);
		
		var contact = navigator.contacts.create();
		contact.displayName = firstname + " " + lastname;
		
		var name = new ContactName();
		name.givenName = firstname;
		name.familyName = lastname;
		contact.name = name;
		
		var phoneNumbers = [new ContactField('mobile', phone,false)];
		contact.phoneNumbers = phoneNumbers;
		
		var emails = [new ContactField('email', email,false)];
		contact.emails = emails;
		
		var photos = [new ContactField('photo', img,false)];
		contact.photos = photos;
		
		var organizations = [new ContactOrganization({name:'SCK Webworks'})]
		contact.organizations = organizations;
		
		contact.save(function() {
			addLink.unbind('click').find('.ui-btn-text').text('Added').addClass('ui-disabled');
		},function(e) {
			console.log(e);
		});
		return false;
	});
}

var contacttemplate = '<div id="{{firstname}}{{lastname}}" data-lastname="{{lastname}}" data-firstname="{{firstname}}" data-phone="{{phone}}" data-email="{{email}}" class="page"><div class="container"><div class="header"><a href="#navmenu-panel" class="bars"></a><h1>{{firstname}} {{lastname}}</h1></div><div class="content"><div class="row"><div><div class="image_cell"><div><img src="images/{{img}}" alt="{{firstname}} {{lastname}}" /></div></div><div><h2>{{position}}</h2><p>{{description}}</p><div class="actions"><a href="{{url}}" class="btn">More about {{firstname}}</a></div></div></div></div></div></div></div>';
var listtemplate = '<li><a href="#{{firstname}}{{lastname}}" class="pagelink">{{firstname}} {{lastname}}<br /><em>{{position}}</em></a></li>';
function applyTemplate(temp, data) {
	var newText = temp;
	for(var nme in data) {
		newText = newText.replace(new RegExp('{{'+nme+'}}','g'), data[nme] || '');
	}
	return newText;
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var defaults = [
	{
		firstname:'Graham',
		lastname:'Sowerby',
		position:'Director',
		description:'Graham looks after business development and oversees search engine optimisation and digital marketing strategies for clients.',
		url:'http://www.sck-webworks.co.uk/about-us/graham-sowerby',
		img:'graham-sowerby-sck.jpg',
		phone:'07545915222',
		email:'graham@sck-webworks.co.uk'
	},
	{
		firstname:'Charlotte',
		lastname:'Metcalfe',
		position:'Accounts Manager',
		description:'Charlotte manages SCK from day to day, and acts on behalf of the customer to ensure projects and service are delivered.',
		url:'http://www.sck-webworks.co.uk/about-us/charlotte-metcalfe',
		img:'charlotte-metcalfe-sck.jpg',
		phone:'07810135884',
		email:'charlotte@sck-webworks.co.uk'
	},
	{
		firstname:'Gavin',
		lastname:'Cummings',
		position:'Project Manager / Web Developer',
		description:'Gavin is a dynamic database specialist, ensuring SCK websites manage customer and product data cleanly and efficiently.',
		url:'http://www.sck-webworks.co.uk/about-us/gavin-cummings',
		img:'gavin-cummings-sck.jpg',
		phone:'01539722712',
		email:'gavin@sck-webworks.co.uk'
	},
	{
		firstname:'Adam',
		lastname:'Hewartson',
		position:'Front End Developer',
		description:'Adam uses the latest interaction methodology to ensure the customer user experience on all SCK websites is straightforward and engaging.',
		url:'http://www.sck-webworks.co.uk/about-us/adam-hewartson',
		img:'adam-hewartson-sck.jpg',
		phone:'01539722712',
		email:'adam@sck-webworks.co.uk'
	},
	{
		firstname:'Graham',
		lastname:'Daws',
		position:'PHP Developer / Server Manager',
		description:'Graham\'s wealth of experience means the fundamental technical development of websites is of the highest quality.',
		url:'http://www.sck-webworks.co.uk/about-us/graham-daws',
		img:'graham-daws-sck.jpg',
		phone:'01539722712',
		email:'gdaws@sck-webworks.co.uk'
	},
	{
		firstname:'Adam',
		lastname:'Ellison',
		position:'Graphics Designer',
		description:'Adam is a skilled graphic designer, and takes concepts from start to high quality finish, ensuring the end product looks great and fits perfectly.',
		url:'http://www.sck-webworks.co.uk/about-us/adam-ellison',
		img:'adam-ellison-sck.jpg',
		phone:'01539722712',
		email:'adam.ellison@sck-webworks.co.uk'
	},
	{
		firstname:'Jack',
		lastname:'Leddy',
		position:'Apprentice',
		description:'Jack is undertaking an IT Professional Apprenticeship at Kendal College whilst working with SCK.',
		url:'http://www.sck-webworks.co.uk/about-us/jack-leddy',
		img:'jack-leddy-sck.jpg',
		phone:'01539722712',
		email:'jack@sck-webworks.co.uk'
	}
];