app.get('/friends', function(req, res) {
	var response = '';
	var friendIds = [];

	var oa = new OAuth('https://api.twitter.com/oauth/request_token'
								, 'https://api.twitter.com/oauth/access_token'
								, conf.twit.consumerKey
								, conf.twit.consumerSecret
								, '1.0'
								, null
								, 'HMAC-SHA1');

	//Grab twitter friends list
  oa.getProtectedResource("http://api.twitter.com/1/friends/ids.json"
		, "GET"
		, req.session.auth.twitter.accessToken
		, req.session.auth.twitter.accessTokenSecret
		, function (error, data) {
	    	if (error) {
		      console.log("Prob getting followers: " + JSON.stringify(error) );
					console.log("accessToken: " +  req.session.auth.twitter.accessToken );
					console.log("accessSecret: " + req.session.auth.twitter.accessTokenSecret );
					console.log("User data: " + JSON.stringify(req.session.auth) );
		    	}
		    var obj = JSON.parse(data);
				console.log( "Recieved object:" + JSON.stringify(obj) );

				//Grab and compare from mongodb
				User.find({ 'twit.id' : { $in : obj.ids } }, function(err, docs) {
					if (err) { console.log("Error retrieving friends: " + err); }
					console.log( "Returned db matches: " + JSON.stringify( docs ) );
					response = docs;
					for(var key in docs) {
						if(docs.hasOwnProperty(key)){
								friendIds.push({ 
										"id" : docs[key].twit.id
										, "name" : docs[key].twit.name 
									});
							}
						}
					 console.log( "Friends list to be saved: " + JSON.stringify(friendIds) );
						var friends = JSON.parse( JSON.stringify(friendIds), function() {
							console.log(friends);
						});
						User.update( { 'twit.id' : req.user.twit.id }
							, { 'friends' : friendIds	}
							, function(err) {
							if(err) { console.log("Error updating friends list: " + err); }
							else { console.log("Friends list Saved to " + req.user.twit.id); }
							//If update successful, then serve documents.
						  if (req.xhr) {
						    res.partial('user', { 
									friends : friendIds
									}, function(err, ret) {
										
										res.send({ friends: friendIds, you: req.user.twit.id, html : ret});
										console.log("Sent friend list" + ret + ", err? " + err);
									});
						  }
							else {
								res.render('users', { friends : friendIds });
							}							
						});
					});
				});
		});