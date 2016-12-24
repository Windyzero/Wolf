var DialogType = require('DialogTypeDef')

cc.Class({
    extends: cc.Component,

    properties: {
        msgLabel: cc.Label,
        closeBtn: cc.Button,
        okBtn: cc.Button,
        bg: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.okCallback = null;
        this.closeCallback = null;
        this.canClick = false;
    },

    onBtnClicked: function(event, customEventData){
        if(!this.canClick){
            return;
        }
        var node = event.target;
        if(node == this.okBtn.node){
            console.log("ok clicked")
            if(this.okCallback){
                this.okCallback()
            }
        }else if(node == this.closeBtn.node){
            console.log("close clicked")
            if(this.closeCallback){
                this.closeCallback()
            }
        }

        this.hideDialog();
    },

    setType: function(type){
        switch(type){
        case DialogType.message:
            this.closeBtn.node.active = false;
            this.okBtn.node.active = false;
            this.bg.scale = 1;
            this.canClick = true;
            break;
        case DialogType.messageWithOk:
            this.closeBtn.node.active = false;
            this.okBtn.node.active = true;
            this.bg.scale = 0;
            this.canClick = false;
            break;
        case DialogType.okAndClose:
            this.closeBtn.node.active = true;
            this.okBtn.node.active = true;
            this.bg.scale = 0;
            this.canClick = false;
            break;
        }
    },

    setMessage: function(msg){
        this.msgLabel.string = msg;
    },

    setOkCallback: function(func){
        this.okCallback = func;
    },

    setCloseCallback: function(func){
        this.closeCallback = func;
    },

    setOkBtnActive: function(bActive){
        this.okBtn.node.active = bActive;
    },

    setCloseBtnActive: function(bActive){
        this.closeBtn.node.active = bActive;
    },

    showDialog: function(){
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 1.0).easing(cc.easeBackOut()),
        cc.callFunc(function(){
            this.canClick = true;
        }, this)));
    },

    hideDialog: function(){
        this.canClick = false;
        this.bg.runAction(cc.sequence(cc.scaleTo(0.2, 0).easing(cc.easeSineOut()),
        cc.callFunc(function(){
            this.node.destroy();
        }, this)));
    }
});
