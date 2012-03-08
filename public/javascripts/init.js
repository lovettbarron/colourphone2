//Learning a lot of this from https://github.com/yyx990803/HTML5-Clear

var connections = {}, mouseX = 0, mouseY = 0, 
	prevMouseX = 0, prevMouseY = 0, userid = 0;
var user = 0;
var friends = new Array();
var context, canvas;

var webappCache = window.applicationCache;

function updateCache() {
    webappCache.swapCache();
}

function errorCache(err) {
    console.log("Cache failed to update:" + err);
}

webappCache.addEventListener("updateready", updateCache, false);
webappCache.addEventListener("error", errorCache, false);



function loop() {
    setInterval(function() {
			for( var key in friends ) {
				if( friends[key].colour !== undefined ) {
					socket.emit( "msg", friends[key].colour, function(err,msg) {
							console.log("sent: " + msg + " ? err: " + err);
						});
 						friendsJSON[key].colour = undefined;
					}
				}
			socket.emit('isUpdate', friendsJSON, function(err) {
				console.log('Checking for update ? err: ' + err)
			});
    }, 200);
}
$(loop);

//Initial connection
var socket = new io.connect('http://emote.me:8000');

socket.on('connect', function() {
		console.log( "Connected to colourphone at " + Date.time() );	
	});
	
socket.on('colour', function(data) {
		console.log( 
			"id: " + data[0] +
			", r:" + data[1] + 
			", g:" + data[2] + 
			", b:" + data[3] );
});
/*
socket.on('friends', function(data) {
	var friendList = $().parseJSON(data);
	var count = 0;
	var userList = $("#main");

	for( friend in friendList) {
		if( (count % 3) == 0 ) { 
			var currentRow = $('<div/>').addClass('row').appendTo(userList);
			}
		count = count + 1;
		var curUser = $("<div/>").addClass('user span4 well').addClass(friend.id).appendTo(currentRow);
		$('<div/>').html('<h3>' + friend.name + '</h3>').appendTo(curUser);
		console.log('rendering ' + friend.id);
	}
	
	console.log( "Got friends: " + data );
}); */

socket.on('disconnect', function() {
		console.log('disconnected');
	});


function onWindowResize( event ) {
	SCREEN_H = window.innerHeight;
	SCREEN_W = window.innerWidth;
	console.log('window: ' + SCREEN_H + ",", + SCREEN_W);
}

socket.on('update', function(data) {
	//console.log('got update:' + JSON.stringify(data));
			for( var key in data ) {
						$('div.user.' + data[key].from )
							.children('div.colourPreview')
							.css(
								'background-color'
								,'rgb(' + data[key].val1 + ',' + data[key].val2 + ',' + data[key].val3 + ')'
							 );
	//			}
			}
	});





function populateFriends() {
	var count = 0;
	var userList = $("div#main");
	
	$.get('/friends', function(data) {
		 console.log('sent/recieved:' + JSON.stringify(data));
		 socket.emit('you',data.you); // I know this is absolutely the wrong way to do this.

			console.log( JSON.stringify(data.friends) );
			for( var key in data.friends ){
				
			 	friends.push( 
						new Friend( 
								data.friends[key].id
								, data.friends[key].name
								, data.friends[key].colour ) 
						);
		} });
}




$(function(){
	//setup scrolling
	$(document)
	.bind('touchmove', function(e){
		if (window.inAction || window.editing || window.draggingDown || document.height <= 356) {
			e.preventDefault();
		} else {
			window.globalDrag = true;
		}
	})
	.bind('touchend touchcancel', function(e){
		window.globalDrag = false;
	});
	
	var app = new Home([
		new List($.os.ios ? 'Hello':'This works better on iOS', [
			new Todo('Swipe right to complete'),
			new Todo('Swipe left to delete'),
			new Todo('Tap on text to edit'),
			new Todo('Long tap to change order'),
			new Todo('Drag down to add new'),
			new Todo('Pinch in to go back.')
		]),
		new List('This is a demo', [
			new Todo('Built with HTML5'),
			new Todo('CSS3'),
			new Todo('and Zepto.js')
		]),
		new List('by Evan You', [
			new Todo('@youyuxi'),
			new Todo('By the way'),
			new Todo('I\'m looking for a job!'),
			new Todo('youyuxi.com')
		])
	]);
	
	app.render().appendTo('#wrapper');
	
});
