var UserData = require('UserData');
var Net = {};

var rid = "1000";

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
