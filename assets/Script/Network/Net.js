var UserData = require('UserData');
var Net = {};

var rid = "1000";

//wait message from the server.
pomelo.on('onChat', function(data) {
	// addMessage(data.from, data.target, data.msg);
	// $("#chatHistory").show();
	// 	if(data.from !== username)
	// 		tip('message', data.from);
    console.log("onChat: " + data.msg);
});

//update user list
pomelo.on('onAdd', function(data) {
	// var user = data.user;
	// tip('online', user);
	// addUser(user);
    console.log("onAdd: ", data.user);
});

//update user list
pomelo.on('onLeave', function(data) {
	// var user = data.user;
	// tip('offline', user);
	// removeUser(user);
    console.log("onLeave: ", data.user);
});

//handle disconect message, occours when the client is disconnect with servers
pomelo.on('disconnect', function(reason) {
	console.log("disconect with servers");
});

Net.queryEntry = function(uid, callback) {
	var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
	    host: "127.0.0.1",
	    port: 3014,
	    log: true
    }, function() {
	    pomelo.request(route, {
		    uid: uid
	    }, function(data) {
		    pomelo.disconnect();
		    if(data.code === 500) {
			    showError(LOGIN_ERROR);
			    return;
		    }
		    callback(data.host, data.port);
	    });
    });
}

Net.login = function(callback){
    //query entry of connection
	Net.queryEntry(UserData.nickName, function(host, port) {
		pomelo.init({
			host: host,
			port: port,
			log: true
		}, function() {
			var route = "connector.entryHandler.enter";
			pomelo.request(route, {
				username: UserData.nickName,
				rid: rid
			}, callback);
		});
	});
}

Net.sendMsg = function(msg, target, callback){
	var route = "chat.chatHandler.send";
	pomelo.request(route, {
			rid: rid,
			content: msg,
			from: UserData.nickName,
			target: target
	}, callback);
}

module.exports = Net;
