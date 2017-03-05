cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        //wait message from the server.
        pomelo.on('onChat', function (data) {
            // addMessage(data.from, data.target, data.msg);
            // $("#chatHistory").show();
            // 	if(data.from !== username)
            // 		tip('message', data.from);
            console.log("onChat: " + data.msg);
            self.node.emit("onChat", {data:data});
        });

        //update user list
        pomelo.on('onAdd', function (data) {
            // var user = data.user;
            // tip('online', user);
            // addUser(user);
            console.log("onAdd: ", data.user);
            self.node.emit("onAdd", {data:data});
        });

        //update user list
        pomelo.on('onLeave', function (data) {
            // var user = data.user;
            // tip('offline', user);
            // removeUser(user);
            console.log("onLeave: ", data.user);
            self.node.emit("onLeave", {data:data});
        });

        //handle disconect message, occours when the client is disconnect with servers
        pomelo.on('disconnect', function (reason) {
            console.log("disconect with servers");
            self.node.emit("disconnect", {reason:reason});
        });
    },
});
