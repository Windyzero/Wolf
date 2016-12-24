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
        });
        this.socket.on('notify', function(notify){
            self.handleNotify(notify);
        });
        this.msgDialog = this.dialogManager.showMessage("正在连接...");
    },

    onResponse: function(msg){
        console.log(msg);
        var res = JSON.parse(msg);
        switch(res.responseType){
        case NetDef.ResponseType.CONNECTED:
            this.startLogin();
            break;
        case NetDef.ResponseType.SUCCESS:
            this.handleResponse(res);
            break;
        case NetDef.ResponseType.ERROR:
            this.dialogManager.showMessage(res.string);
            break;
        default:
            console.log("unknown action");
            break;
        }
    },

    handleResponse: function(res){
        switch(res.actionType){
        case NetDef.ActionType.LOGIN:
            if(this.msgDialog){
                this.msgDialog.setMessage("连接成功！");
                this.msgDialog.setOkBtnActive(true);
            }
            this.gameManager.enterMainPanel();
            break;
        }
    },

    handleNotify: function(notify){
        switch(notify.notifyType){
        case NetDef.ActionType.LOGIN:
            if(this.msgDialog){
                this.msgDialog.setMessage("连接成功！");
                this.msgDialog.setOkBtnActive(true);
            }
            this.gameManager.enterMainPanel();
            break;
        }
    },

    startLogin: function(){
        var req = {
            actionType: NetDef.ActionType.LOGIN,
            name: UserData.nickName,
        };
        this.socket.emit('request', JSON.stringify(req));
    }
});
