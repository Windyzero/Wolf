var DialogType = require('DialogTypeDef');
var Dialog = require('Dialog');

cc.Class({
    extends: cc.Component,

    properties: {
        topPanel: cc.Node,
        dialogPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {

    },

    createDialog: function(){
        var dialog = cc.instantiate(this.dialogPrefab);
        this.topPanel.addChild(dialog);
        return dialog.getComponent(Dialog);
    },

    showMessage: function(msg){
        var dialog = this.createDialog();
        dialog.setType(DialogType.message);
        dialog.setMessage(msg);
        return dialog;
    },

    showMessageWithOk: function(msg, okCallback){
        var dialog = this.createDialog();
        dialog.setType(DialogType.messageWithOk);
        dialog.setMessage(msg);
        if(okCallback){
            dialog.setOkCallback(okCallback);
        }
        dialog.showDialog();
        return dialog;
    },

    showOkAndClose: function(msg, okCallback, closeCallback){
        var dialog = this.createDialog();
        dialog.setType(DialogType.okAndClose);
        dialog.setMessage(msg);
        if(okCallback){
            dialog.setOkCallback(okCallback);
        }
        if(closeCallback){
            dialog.setCloseCallback(closeCallback);
        }
        dialog.showDialog();
        return dialog;
    }
});
