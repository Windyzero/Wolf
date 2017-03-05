var StringUtil = require('StringUtil')
var Net = require('Net')
var UserData = require('UserData')

cc.Class({
    extends: cc.Component,

    properties: {
        btnConfirm: cc.Button,
        nickEditBox: cc.EditBox,
        dialogManager: require('DialogManager'),
        gameManager: require('GameManager')
    },

    // use this for initialization
    onLoad: function () {
        this.btnConfirm.interactable = false;
    },

    onTextChanged: function(text, editbox, customEventData){
        text = StringUtil.trim(text);

        if(text.length > 0){
            this.btnConfirm.interactable = true;
        }else{
            this.btnConfirm.interactable = false;
        }
    },

    onBtnClicked: function(event, customEventData){
        var text = StringUtil.trim(this.nickEditBox.string);
        this.nickEditBox.string = text;
        UserData.nickName = text;

        this.btnConfirm.interactable = false;
        var self = this;
        Net.login(function(data){
			if(data.error) {
//				showError("username exists!");
                self.dialogManager.showMessageWithOk("username exists!");
                self.btnConfirm.interactable = true;
				return;
			}
            self.gameManager.enterMainPanel();
        });
    },
});
