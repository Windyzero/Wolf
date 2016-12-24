var NetDef = require('NetDef')
var UserData = require('UserData')
var DialogManager = require('DialogManager')
var GameManager = require('GameManager')

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isNative){
            window.io = SocketIO;
        }

        this.socket = null;
        this.dialogManager = this.node.getComponent(DialogManager);
        this.gameManager = this.node.getComponent(GameManager);
//        this.startConnection();
    },

    startConnection: function() {
        let self = this;
        this.socket = io('http://localhost:3000');
        this.socket.on('response', function(msg){
            self.onResponse(msg);
            if(self.msgDialog){
                self.msgDialog.setMessage("连接成功！");
                self.msgDialog.setOkBtnActive(true);
            }
            self.gameManager.enterMainPanel();
        });
        this.msgDialog = this.dialogManager.showMessage("正在连接...");
    },

    onResponse: function(msg){
        console.log(msg);
        var res = JSON.parse(msg);
        switch(res.actionType){
        case NetDef.Response.CONNECTED:
            break;
        default:
            console.log("unknown action");
            break;
        }
    }
});
