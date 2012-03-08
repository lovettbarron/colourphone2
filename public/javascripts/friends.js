var template = {
	Friend: function (friend) {
			return '<li class="friend ' + (friend.id ? friend.id : '') + '">'
			+ '<div class="inner">'
			+ '<div class="name">' + friend.name + '<span></span></div>'
			+ '</div></li>';
		},
	ColourField: function(friend) { // Modal window for affecting colour, recieved is the one the friend sent.
		return '<div class="modal '+ (friend.id ? friend.id : '') +'">'
		+ '<div class="recievedColour"></div>'
		+ '</div>';
		
	}
	
	
	
}


var Friend = function(id, name) {
	this.id = id;
	this.name = name;
	this.color = { 'r': 0, 'g': 0, 'b':0 };
	
	
	
	
}


Friend.prototype = {
	
	render: function(index, color) {
		var friend = this,
				id = this.id,
				name = this.name,
				sendColour = false,
				sendMessage = false,
				dragging = false,
				dragFrom = 0,
				swiping = false,
				touch = {},
				w = 55,
				dx = dy = 0; // This is the object touch X/Y??		
		
		friend.base = $(template.Friend(friend))
		
		friend.base.bind('touchstart', function(e) {
			if(e.touch.length == 1 && !window.editing) {
				touch.x1 = e.touches[0].pageX;
				touch.y1 = e.touches[0].pageY;
			}
		})
		.bind('touchmove', function(e) {
			if (!window.globalDrag && !window.editing && !window.draggingDown && e.touches.length == 1) {
				dx = e.touches[0].page  - touch.x1;
				dy = e.touches[0].pageY - touch.y1;
			
				if (Math.abs(dy) < 6 && Math.abs(dx) > 0 && !swiping && !dragging) {
					swiping = true;
					window.inAction = true;
					todo.el.addClass('drag');
					list.home.resetIcons(todo.el);
				}
			
		})
		.bind('swipeLeft', function(e){ //Brings up text field
			
		})
		.bind('swipeRight', function(e) { //Returns to colour field?
				
		})
		.bind('longTap', function(e) { //Fills screen with user's colour w/ text
			
		})
		.bind('tap', function(e) { //Bring up colour interaciton
			friend.sendColour();
		})
		.bind('touchend cancel', function(e) {
			
		})
	},
	sendColour: function(e) {
		
	},
	sendMessage: function(e) {
		
	}
	
}