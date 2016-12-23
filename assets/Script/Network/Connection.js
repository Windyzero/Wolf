var NetDef = require('NetDef')

cc.Class({
    extends: cc.Component,

    properties: {
        statuLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isNative){
            window.io = SocketIO;
        }

        this.socket = null;
        this.statuLabel.string = "connecting";
        this.initConnection();
    },

    initConnection: function() {
        let self = this;
        this.socket = io('http://localhost:3000');
        this.socket.on('response', function(msg){
            self.onResponse(msg);
        });
    },

    onResponse: function(msg){
        console.log(msg);
        var res = JSON.parse(msg);
        switch(res.actionType){
        case NetDef.Response.CONNECTED:
            this.statuLabel.string = res.string;
            break;
        default:
            console.log("unknown action");
            break;
        }
    }
});
